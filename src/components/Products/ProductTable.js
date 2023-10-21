import React, { useContext } from "react";
import classes from "./Products.module.css";
import AuthContext from "../../store/auth-context";
import ShowProduct from "./Operations/ShowProduct";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { BsEye } from "react-icons/bs";
const ProductTable = ({ products }) => {
  const { onModalShowHandler, isModalOpen } = useContext(AuthContext);
  return (
    <div className={classes.ProductTable}>
      {isModalOpen.isOpen && <ShowProduct />}

      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Product Category</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>₹{Math.trunc(p.price)}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    onClick={() => {
                      let id = p.id;
                      onModalShowHandler(id, "show");
                    }}
                  >
                    <BsEye size={"20px"} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      let id = p.id;
                      onModalShowHandler(id, "edit");
                    }}
                  >
                    <MdModeEditOutline size={"20px"} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      ) {
                        let id = p.id;
                        onModalShowHandler(id, "delete");
                      }
                    }}
                  >
                    <MdDelete size={"20px"} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
