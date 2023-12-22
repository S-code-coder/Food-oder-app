import React,{useContext} from "react";
import AvailableForm from "./AvailableItemForm";
import Classes from "./AvailableMealItem.module.css";
import AuthContext from "../Context/AuthContext";

const AvailableMealItem = props =>{
   const ctx = useContext(AuthContext)
    const addToCartHandler = amount =>{
        ctx.addItem({
            id : props.id,
            name : props.name,
            amount : amount,
            price: props.price
        })
    }
    return(
        <li className={Classes.meal}>
            <div>
                <h3>{props.name}</h3>  
                <div className={Classes.description}>{props.description}</div>
                <div className={Classes.price}>{props.price}</div>
            </div>
            <div>
                <AvailableForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default AvailableMealItem;