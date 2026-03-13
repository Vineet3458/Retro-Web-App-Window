import { BrowserRouter, Routes, Route } from "react-router-dom";

import Background from "./components/Background";
import PixelizerPage from "./pages/PixelizerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/pixelizer" element={<PixelizerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;