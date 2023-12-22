import React, { useContext, useState } from "react";
import Modal from "./Modal";
import AuthContext from "../Context/AuthContext";
import useForm from "../hooks/useForm-hook";
import classes from "./orderForm.module.css";
import useFetch from "../hooks/useFetch-hook";

const OrderForm = () => {
  const ctx = useContext(AuthContext);
  const { error, loading, sendRequest: orderFormRequest } = useFetch();
  const [didSubmit, setdidSubmit] = useState(false);

  const {
    value: enteredName,
    inputChangeHandler: enteredNameChangeHandler,
    inputBlurHandler: enteredNameBlurHandler,
    resetHandler: resetNameHandler,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    resetHandler: resetStreetHandler,
    isValid: streetIsValid,
    hasError: streetHasError,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    inputChangeHandler: PostalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    resetHandler: resetPostalHandler,
    isValid: postalIsValid,
    hasError: postalHasError,
  } = useForm((value) => value.trim().length === 6);

  const {
    value: enteredCity,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetHandler: resetCityHandler,
    isValid: cityIsValid,
    hasError: cityHasError,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: resetEmailHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useForm((value) => value.includes("@"));

  let formIsvalid = false;
  if (
    enteredNameIsValid &&
    streetIsValid &&
    postalIsValid &&
    cityIsValid &&
    emailIsValid
  ) {
    formIsvalid = true;
  }

  const cancelHandler = () => {
    ctx.clearCart();
    resetNameHandler();
    resetEmailHandler();
    resetCityHandler();
    resetPostalHandler();
    resetStreetHandler();
    ctx.hideForm();
  };

  const confirmHandler = (e) => {
    e.preventDefault();

    if (!formIsvalid) {
      return;
    }
    //send the request

    const userData = {
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      postalcode: enteredPostal,
      city: enteredCity,
    };
    orderFormRequest(
      {
        url: "https://react-data-435f8-default-rtdb.firebaseio.com/profile.json",
        method: "POST",
        body: { user: userData, ordererdItems: ctx.items },
        headers: { "Content-Type": "application/json" },
      },
    );
    setdidSubmit(true);
    resetNameHandler();
    resetEmailHandler();
    resetCityHandler();
    resetPostalHandler();
    resetStreetHandler();
  };

  let ModalContent = (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.formgroup}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={enteredNameBlurHandler}
          onChange={enteredNameChangeHandler}
        />
        {enteredNameHasError && (
          <p className={classes.invalid}>This Field can't be empty</p>
        )}
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="street">Your Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
        />
        {streetHasError && (
          <p className={classes.invalid}>This Field can't be empty</p>
        )}
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="postal">Your Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onBlur={postalBlurHandler}
          onChange={PostalChangeHandler}
        />
        {postalHasError && (
          <p className={classes.invalid}>This numbers must be 6 digits</p>
        )}
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="city">Your city</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
        />
        {cityHasError && (
          <p className={classes.invalid}>This Field can't be empty</p>
        )}
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="address">Your Address</label>
        <input
          type="email"
          id="adress"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailHasError && (
          <p className={classes.invalid}>This Field must contain '@'</p>
        )}
      </div>
      <button className={classes.button} type="button" onClick={cancelHandler}>
        Cancel
      </button>
      <button className={classes.button} disabled={!formIsvalid}>
        Confirm
      </button>
    </form>
  );
  if (loading) {
    ModalContent = <p>Sending order data...</p>;
  }
  if (error) {
    ModalContent = (
      <React.Fragment>
        <p>something went wrong</p>{" "}
        <button
          className={classes.button}
          type="button"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
  if (didSubmit) {
    ModalContent = (
      <React.Fragment>
        <p>order successful </p>
        <button
          className={classes.button}
          type="button"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }

  return <>{ctx.orderFormDisplay && <Modal>{ModalContent}</Modal>}</>;
};
export default OrderForm;
