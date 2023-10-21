import React, { Fragment, useEffect, useState } from "react";
import classes from "./Products.module.css";
import SearchBox from "./SearchBox";
import ProductTable from "./ProductTable";
import ProductCategory from "./ProductCategory";
import useProducts from "../../Hooks/use-products";
const MainIndex = () => {
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dropDawnValue, setDropDawnValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { isLoading, error, SendRequest: fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts(
      {
        url: "https://fakestoreapi.com/products",
      },
      (data) => {
        setProducts(data);
        setSearchResults(data);
      }
    );
  }, [fetchProducts]);
  const inputSearch = (input) => {
    setSearchInput(input);
  };

  const clearInput = () => {
    setSearchInput(" ");
  };
  const categoryHandler = (category) => {
    setDropDawnValue(category);
    if (category) {
      const catPosts = products.filter((prod) => prod.category === category);
      setProductCategory(catPosts);
      setSearchResults(catPosts);
    } else {
      setSearchResults(products);
    }
  };
  let content = (
    <Fragment>
      <div className={classes.actionsContainer}>
        <SearchBox
          onSrachInput={inputSearch}
          searchInput={searchInput}
          products={products}
          productCategory={productCategory}
          dropDawnValue={dropDawnValue}
          setSearchResults={setSearchResults}
        />
        <ProductCategory
          onClearInput={clearInput}
          products={products}
          onCategoryHandler={categoryHandler}
        />
      </div>
      {searchResults.length !== 0 ? (
        <ProductTable products={searchResults} />
      ) : (
        <p>Not match</p>
      )}
    </Fragment>
  );

  if (isLoading) {
    content = <p>Loading..</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={classes.MainIndex}>
      <h2>Manage Products</h2>
      {content}
    </div>
  );
};

export default MainIndex;
