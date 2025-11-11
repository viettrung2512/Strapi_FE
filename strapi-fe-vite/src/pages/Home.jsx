import AppBar from "../components/AppBar";
import FeaturedArticles from "../components/FeaturedArticles";
import NewArticles from "../components/NewArticles";
import TopArticles from "../components/TopArticles";
import FloatingButton from "../components/FloatingButton";
function Home() {
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
      <FloatingButton />
    </main>
  );
}

export default Home;
