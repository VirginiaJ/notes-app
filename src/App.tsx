import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { getRequest } from "./helpers";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ManagePage from "./pages/ManagePage";
import NotFoundPage from "./pages/NotFoundPage";
import SummaryPage from "./pages/SummaryPage";
import { TCategory, useStore } from "./store";

function App() {
  const setNotes = useStore((state) => state.setNotes);
  const setCategories = useStore((state) => state.setCategories);
  const setCategoriesMap = useStore((state) => state.setCategoriesMap);

  useEffect(() => {
    const getData = async () => {
      const notes = await getRequest(
        `${process.env.REACT_APP_API_ENDPOINT}/notes`
      );
      const categories = await getRequest(
        `${process.env.REACT_APP_API_ENDPOINT}/categories`
      );

      setNotes(notes);
      setCategories(categories);
      const categoriesMap = {} as Record<string, TCategory>;
      categories.forEach((category: TCategory) => {
        categoriesMap[category._id] = category;
      });
      setCategoriesMap(categoriesMap);
    };
    getData();
  }, [setCategories, setCategoriesMap, setNotes]);

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
