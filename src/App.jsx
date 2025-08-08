import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Playground from "./components/Editor/Playground";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
