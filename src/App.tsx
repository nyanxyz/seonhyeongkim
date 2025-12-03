import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DvorakSymphony } from "./components/DvorakSymphony";
import { DvorakSymphony2 } from "./components/DvorakSymphony2";
import { HungarianDance } from "./components/HungarianDance";
import { TchaikovskySymphony } from "./components/TchaikovskySymphony";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/01" element={<HungarianDance />} />
        <Route path="/02" element={<TchaikovskySymphony />} />
        <Route path="/03" element={<DvorakSymphony />} />
        <Route path="/03-changed" element={<DvorakSymphony2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
