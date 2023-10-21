import React from "react";
import classes from "./Products.module.css";
const ProductCategory = ({ products, onCategoryHandler, onClearInput }) => {
  const productCategory = [...new Set(products.map((p) => p.category))];

  const categoryHandler = (e) => {
    onCategoryHandler(e.target.value);
    onClearInput();
  };
  return (
    <div className={classes.ProductCategory}>
      <div className={classes.dropdawn}>
        <label>Filter:</label>
        <select onChange={categoryHandler}>
          <option value="">--Select--</option>
          {productCategory.map((ctg, i) => {
            return (
              <option key={i} value={ctg}>
                {ctg}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ProductCategory;
