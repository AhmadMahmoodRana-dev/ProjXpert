import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home1 from "./pages/Home";
import Peoples from "./pages/Peoples";
import PeopleForm from "./components/PeopleForm";
import DetailShow from "./components/DetailShow";

export default function App() {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/people" element={<Peoples />} />
        </Routes>
          <PeopleForm/>
          <DetailShow/>
      </div>
    </>
  );
}
