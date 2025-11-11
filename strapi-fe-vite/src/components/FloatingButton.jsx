import { Button } from 'antd';
import { MessageCircle } from 'lucide-react';

const FloatingButton = ({ onClick, icon = <MessageCircle />, tooltip }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={icon}
      onClick={onClick}
      title={tooltip}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    />
  );
};

export default FloatingButton;
