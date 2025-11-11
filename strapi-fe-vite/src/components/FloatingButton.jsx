import { Button } from 'antd';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = ({ onClick, icon = <MessageCircle />, tooltip }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/contact');
    }
  };

  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={icon}
      onClick={handleClick}
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
