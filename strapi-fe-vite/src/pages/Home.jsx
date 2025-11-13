import { useState } from "react";
import AppBar from "../components/AppBar";
import FeaturedArticles from "../components/FeaturedArticles";
import NewArticles from "../components/NewArticles";
import TopArticles from "../components/TopArticles";
import ContactModal from "../components/ContactModal";
import FloatingButton from "../components/FloatingButton";

const Home = () => {
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const handleOpenContactModal = () => {
    setContactModalVisible(true);
  };

  const handleCloseContactModal = () => {
    setContactModalVisible(false);
  };

  return (
    <div
      style={{
        background: "#f0f8ff",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <AppBar></AppBar>
      <TopArticles></TopArticles>
      <FeaturedArticles></FeaturedArticles>
      <NewArticles></NewArticles>

      <FloatingButton
        onClick={handleOpenContactModal}
        tooltip="Liên hệ với chúng tôi"
      />

      <ContactModal
        visible={contactModalVisible}
        onClose={handleCloseContactModal}
      />
    </div>
  );
};

export default Home;
