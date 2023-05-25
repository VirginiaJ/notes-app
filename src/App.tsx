import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ManagePage from "./pages/ManagePage";
import NotFoundPage from "./pages/NotFoundPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="manage" element={<ManagePage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
