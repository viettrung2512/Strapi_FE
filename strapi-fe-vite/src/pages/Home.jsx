import { useState } from "react";
import AppBar from "../components/AppBar";
import FeaturedArticles from "../components/FeaturedArticles";
import NewArticles from "../components/NewArticles";
import TopArticles from "../components/TopArticles";
import FloatingButton from "../components/FloatingButton";
import ContactModal from "../components/ContactModal";

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <main
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
      <FloatingButton onClick={showModal} />
      <ContactModal visible={isModalVisible} onClose={handleCancel} />
    </main>
  );
}

export default Home;
