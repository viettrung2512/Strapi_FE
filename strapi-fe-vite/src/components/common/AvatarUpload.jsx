import  { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const AvatarUpload = ({ onAvatarChange }) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên JPG/PNG!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
      return false;
    }

    try {
      setLoading(true);
      
      // CHỈ TẠO PREVIEW, KHÔNG UPLOAD NGAY
      const preview = await getBase64(file);
      setImageUrl(preview);
      setSelectedFile(file);
      
      // Gửi file object cho parent component
      onAvatarChange(file);
      message.success('Upload ảnh thành công!');
      
    } catch (error) {
      console.error('Preview error:', error);
      message.error('Lỗi xử lý ảnh!');
    } finally {
      setLoading(false);
    }

    return false; 
  };

  const handleRemove = () => {
    setImageUrl('');
    setSelectedFile(null);
    onAvatarChange(null);
    message.info('Đã xóa ảnh');
  };

  return (
    <div className="avatar-upload-container">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        maxCount={1}
        accept="image/jpeg,image/png"
      >
        {imageUrl ? (
          <div className="avatar-preview">
            <img src={imageUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
        ) : (
          <div className="upload-placeholder">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="upload-text">Tải ảnh lên</div>
          </div>
        )}
      </Upload>
      {imageUrl && (
        <Button
          type="link"
          onClick={handleRemove}
          className="remove-avatar"
          style={{ display: 'block', marginTop: '8px' }}
        >
          Xóa ảnh
        </Button>
      )}
    </div>
  );
};

export default AvatarUpload;