import React,{useContext} from "react";
import Modal from "../UI/Modal";
import AuthContext from "../Context/AuthContext";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";


const Cart = props =>{
    const ctx = useContext(AuthContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id =>{
        ctx.removeItem(id)
    };
    const cartItemAddHandler = item => {
        ctx.addItem(item);
    };
    const onClickHandler =()=>{
        ctx.onClose();
        ctx.showForm();
    }
    const onCloseHandler = () =>{
        ctx.onClose();
        ctx.clearCart()
    }

    const CartItems = < ul className={classes['cart-items']}> {ctx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)} </ul>
    return(
        <React.Fragment>
            {ctx.cartDisplay &&
            <Modal>
            {CartItems} 
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={onCloseHandler}>Close</button>
                   {hasItems &&  <button className={classes.button} onClick={onClickHandler}>Order</button>}
                </div> 
            </Modal> }
        </React.Fragment>
    )
}

export default Cart;