import React, { useState, useEffect } from "react";
import { Badge, Popover, List, Avatar, Empty, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const StyledListItem = styled(List.Item)`
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // lấy userid từ localstorage
  const getUserId = () => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        return user?.id ? String(user.id) : null;
      }
      return null;
    } catch (e) {
      console.error("Lỗi lấy user từ localStorage", e);
      return null;
    }
  };

  // Lắng nghe thông báo real-time
  useEffect(() => {
    const userId = getUserId();
    // Nếu không có user, không làm gì cả
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    // lấy đường dẫn tham chiếu đến collection trên firestore (db/user_notifications/userId/notifications)
    const notifRef = collection(
      db,
      "user_notifications",
      userId,
      "notifications"
    );
    // query(NOI_MUON_LAY_DATA, CAC_DIEU_KIEN_LOC_SAP_XEP)
    const q = query(notifRef, orderBy("timestamp", "desc"));
    //onSnapshot(TRUY_VAN, CALLBACK) là hàm lắng nghe của firestore và nó trả về 1 hàm.
    //nó sẽ thực hiện truy vấn và trả về tất cả dữ liệu, sau đó tiếp tục lắng nghe, bất cứ khi nào có thay đổi trên server thì sẽ tự động chạy lại để lấy dữ liệu mới
    //CALLBACK sẽ được thực thi mỗi khi onSnapshot có dữ liệu mới
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   console.log(
      //     `[DEBUG] Vừa nhận được ${querySnapshot.size} thông báo từ Firestore!`
      //   );
      const newNotifs = [];
      let newUnreadCount = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newNotifs.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp
            ? formatDistanceToNow(data.timestamp.toDate(), {
                addSuffix: true,
                locale: vi,
              })
            : "Vừa xong",
        });

        if (data.isRead === false) {
          newUnreadCount++;
        }
      });

      setNotifications(newNotifs);
      setUnreadCount(newUnreadCount);
    });

    return () => unsubscribe();
  }, []);
  // xử lý sự kiện khi click vào 1 noti
  const handleNotiClick = async (item) => {
    const userId = getUserId();
    if (!userId) return;

    // 1. Đánh dấu nó đã đọc (nếu chưa đọc)
    if (item.isRead === false) {
      // lấy tham chiếu đến thẳng 1 document cụ thể
      const notiDocRef = doc(
        db,
        "user_notifications",
        userId,
        "notifications",
        item.id
      );
      try {
        await updateDoc(notiDocRef, { isRead: true });
      } catch (e) {
        console.error("Lỗi đánh dấu đã đọc:", e);
      }
    }

    // 2. Điều hướng đến link của thông báo
    if (item.link) {
      navigate(item.link);
    }
  };
  // xử lý sự kiện đánh dấu tất cả noti là "đã đọc"
  const handleMarkAllAsRead = async () => {
    const userId = getUserId();
    if (!userId || unreadCount === 0) return;
    //lấy ra các noti chưa đọc và update nó thành đã đọc
    const unreadNotifs = notifications.filter((noti) => noti.isRead === false);

    const batch = writeBatch(db);

    unreadNotifs.forEach((noti) => {
      const notiDocRef = doc(
        db,
        "user_notifications",
        userId,
        "notifications",
        noti.id
      );
      batch.update(notiDocRef, { isRead: true });
    });

    try {
      await batch.commit();
      console.log("Đã đánh dấu tất cả là đã đọc");
    } catch (e) {
      console.error("Lỗi khi đánh dấu tất cả đã đọc:", e);
    }
  };

  const notificationList = (
    <div style={{ width: 350 }}>
      {notifications.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <StyledListItem onClick={() => handleNotiClick(item)}>
              <List.Item.Meta
                title={item.title}
                description={item.timestamp}
                style={{ opacity: item.isRead ? 0.5 : 1, padding: "0 8px" }}
              />
            </StyledListItem>
          )}
          style={{ maxHeight: 400, overflowY: "auto" }}
        />
      ) : (
        <Empty description="Không có thông báo mới" />
      )}

      {notifications.length > 0 && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "14px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button
            type="link"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      content={notificationList}
      title="Thông báo"
      trigger="click"
      placement="bottomRight"
    >
      <Badge
        count={unreadCount}
        overflowCount={10}
        style={{ marginRight: "16px" }}
      >
        <BellOutlined
          style={{ fontSize: "24px", cursor: "pointer", marginRight: "16px" }}
        />
      </Badge>
    </Popover>
  );
};

export default Notification;
