import styles from "./App.module.scss";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
