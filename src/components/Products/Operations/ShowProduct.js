import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";
import Modal from "../../UI/Modal/Modal";
import useProducts from "../../../Hooks/use-products";
import classes from "../Products.module.css";
import EditForm from "./EditForm";
import DeleteProduct from "./DeleteProduct";


const ShowProduct = () => {
  
  const [product, setProduct] = useState([]);
  const { isLoading, SendRequest: fetchProduct } = useProducts();
  const { isModalOpen, onCloseModal } = useContext(AuthContext);
  const { title, price, image } = product;

  useEffect(() => {
    if (isModalOpen.type === "delete") return;
    const getProduct = (data) => {
      setProduct(data);
    };

    fetchProduct(
      {
        url: `https://fakestoreapi.com/products/${isModalOpen.prodId}`,
      },
      getProduct
    );
  }, [fetchProduct, isModalOpen.prodId, isModalOpen.type]);

  let prodContent = (
    <div className={classes.imgContainer}>
      <img src={image} alt={title} width={80} height={50} />
      <h3>{title}</h3>
      <span>₹{Math.trunc(price)}</span>
    </div>
  );

  if (isModalOpen.type === "edit") {
    prodContent = <EditForm product={product} />;
  }

  if (isModalOpen.type === "delete") {
    prodContent = <DeleteProduct id={isModalOpen.prodId} />;
  }
  if (isLoading) {
    prodContent = <p>Loading....</p>;
  }

  return (
    <Modal onClose={onCloseModal}>   
      <div className={classes.prodContainer}>
        {prodContent}
      </div>
    </Modal>
  );
};

export default ShowProduct;
