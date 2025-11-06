import AppBar from "../components/AppBar";
import FeaturedArticles from "../components/FeaturedArticles";
import NewArticles from "../components/NewArticles";
import TopArticles from "../components/TopArticles";
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
    </main>
  );
}

export default Home;
