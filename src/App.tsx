import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DvorakSymphony } from "./components/DvorakSymphony";
import { HungarianDance } from "./components/HungarianDance";
import { TchaikovskySymphony } from "./components/TchaikovskySymphony";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/01" element={<HungarianDance />} />
        <Route path="/02" element={<TchaikovskySymphony />} />
        <Route path="/03" element={<DvorakSymphony />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
