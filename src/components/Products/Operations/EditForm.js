import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "../../Login/Form.module.css";
import Button from "../../UI/Button/Button";
import useProducts from "../../../Hooks/use-products";
import Result from "../Result";

const EditForm = ({ product }) => {
  const initialValue = { title: product.title, price: product.price };
  const [formValue, setFormValue] = useState(initialValue);
  const [updatedValue, setUpdatedValue] = useState({});

  const {
    isLoading,
    isComplete,
    SendRequest: SendProdRequest,
  } = useProducts();

  const { title, price } = updatedValue;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const updateProduct = async () => {
    SendProdRequest(
      {
        url: `https://fakestoreapi.com/products/${product.id}`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        setUpdatedValue(data);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  let fromContent = (
    <form onSubmit={handleSubmit}>
      <Input
        name="title"
        label="Title"
        type="text"
        value={formValue.title}
        onChange={handleChange}
      />

      <Input
        name="price"
        label="Price"
        type="Number"
        value={formValue.price}
        onChange={handleChange}
      />

      <div className={classes.actions}>
        <Button type="submit" className={classes.btn}>
          Save
        </Button>
      </div>
    </form>
  );

  if (isLoading) {
    fromContent = <p>Loading..</p>;
  }

  if (isComplete) {
    fromContent = (
      <Result
        msg={"Data has been Updated successfully !"}
        record={"UPDATED"}
        title={title}
        price={price}
      />
    );
  }

  return <div className={classes.formEdit}>{fromContent}</div>;
};

export default EditForm;
