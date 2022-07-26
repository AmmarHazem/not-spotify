import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden flex">
      <Sidebar />
      <MainContent />
      <div>{/* Player bar */}</div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
