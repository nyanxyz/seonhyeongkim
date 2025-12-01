import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HungarianDance } from "./components/HungarianDance";
import { TchaikovskySymphony } from "./components/TchaikovskySymphony";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/01" element={<HungarianDance />} />
        <Route path="/02" element={<TchaikovskySymphony />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
