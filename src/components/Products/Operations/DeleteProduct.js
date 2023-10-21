import React, { useEffect, useState } from "react";
import useProducts from "../../../Hooks/use-products";
import Result from "../Result";

const DeleteProduct = ({ id }) => {
  const { isLoading, isComplete, SendRequest: DeleteRequest } = useProducts();
  const [deleteData, setDeleteData] = useState({});
  let { title, price } = deleteData;
  let deleteContent = "";
  
  useEffect(() => {
    DeleteRequest(
      {
        url: `https://fakestoreapi.com/products/${id}`,
        method: "DELETE",
      },
      (data) => {
        setDeleteData(data);
      }
    );
  }, [DeleteRequest, id]);

  if (isLoading) {
    deleteContent = <p>Loading...</p>;
  }

  if (isComplete) {
    deleteContent = (
      <Result
        msg={"Data has been Deleted Successfully"}
        record={"DELETED"}
        title={title}
        price={price}
      />
    );
  }
  return <div>{deleteContent}</div>;
};

export default DeleteProduct;
