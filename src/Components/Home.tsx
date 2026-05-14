import Navbar from "./Navbar";
import Footer from "./Footer";
import CRUD from "../Pages/CRUD";
import NoteData from "../Pages/NoteData";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <CRUD />
      </div>
      <div>
        <NoteData />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
