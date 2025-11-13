import { Button } from 'antd';
import { MessageCircle } from 'lucide-react';

const FloatingButton = ({ 
  onClick, 
  icon = <MessageCircle />, 
  tooltip = "Liên hệ với chúng tôi",
  position = "fixed",
  bottom = "20px",
  right = "20px" 
}) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={icon}
      onClick={onClick}
      title={tooltip}
      style={{
        position: position,
        bottom: bottom,
        right: right,
        zIndex: 1000,
      }}
    />
  );
};

export default FloatingButton;