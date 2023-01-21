import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Rootlayout;
