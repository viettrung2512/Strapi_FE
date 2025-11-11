import React, { useState } from "react";
import { Badge, Popover, List, Avatar, Empty, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import styled from "styled-components";
const mockNotifications = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "5 phút trước",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=2",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "1 giờ trước",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 7,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 8,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 9,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
  {
    id: 10,
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Admin đã phản hồi câu hỏi của bạn",
    timestamp: "Hôm qua",
  },
];
const StyledListItem = styled(List.Item)`
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Notification = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const notificationList = (
    <div style={{ width: 350 }}>
      {notifications.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <StyledListItem>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.timestamp}
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
          <Button type="link" onClick={() => setUnreadCount(0)}>
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      )}
    </div>
  );

  // Khi người dùng bấm vào chuông
  const handleBellClick = () => {
    // Có thể bạn muốn API gọi API để "đánh dấu đã xem" (seen) ở đây
    // và sau đó mới setUnreadCount(0)
    // Tạm thời, chúng ta sẽ xóa số đếm ngay khi bấm
    if (unreadCount > 0) {
      // Logic thực tế: setUnreadCount(0) sau khi API thành công
    }
  };

  return (
    <Popover
      content={notificationList}
      title="Thông báo"
      trigger="click"
      placement="bottomRight"
      onOpenChange={handleBellClick}
    >
      <Badge
        count={unreadCount}
        overflowCount={10}
        style={{
          marginRight: "16px",
        }}
      >
        <BellOutlined
          style={{ fontSize: "24px", cursor: "pointer", marginRight: "16px" }}
        />
      </Badge>
    </Popover>
  );
};

export default Notification;
