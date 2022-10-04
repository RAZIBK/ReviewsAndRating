import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reviews from "./Compnents/Reviews/Reviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
