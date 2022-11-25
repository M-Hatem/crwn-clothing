import { useState, createContext, useEffect } from "react";

import { getCollectionAndDocuments } from "../includes/firebase";

const CategoriesContext = createContext({
  categories: {},
  setCategories: () => null,
});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const value = { categories, setCategories };

  // To get all categories from database
  useEffect(() => {
    (async () => {
      const getCategories = await getCollectionAndDocuments();
      setCategories(getCategories);
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
