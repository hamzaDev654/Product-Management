import React from "react";
import classes from "./Products.module.css";
const SearchBox = ({
  products,
  setSearchResults,
  productCategory,
  dropDawnValue,
  onSrachInput,
  searchInput,
}) => {
  let resultsArray;

  const handleSearchChange = (e) => {
    let value = e.target.value.toLowerCase();

    onSrachInput(value);
    if (!value)
      return dropDawnValue
        ? setSearchResults(productCategory)
        : setSearchResults(products);

    if (dropDawnValue) {
      // Apply the filter to productCategory
      resultsArray = productCategory.filter(
        (prod) =>
          prod.title.toLowerCase().includes(value) ||
          prod.description.toLowerCase().includes(value)
      );
    } else {
      // Apply the filter to products
      resultsArray = products.filter(
        (prod) =>
          prod.title.toLowerCase().includes(value) ||
          prod.description.toLowerCase().includes(value)
      );
    }
    setSearchResults(resultsArray);
  };
  return (
    <div className={classes.SearchBox}>
      <label>Search:</label>
      <input type="text" value={searchInput} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBox;
