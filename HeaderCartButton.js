import React,{useContext,useEffect,useState} from "react";
import CartIcon from "../Chart/CartIcon";
import AuthContext from "../Context/AuthContext";
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props =>{
   const [bthIsHighlited,setbtnIsHighlited] = useState(false)
   const ctx = useContext(AuthContext)
   const {items} = ctx;
    const numberOfCartItems = items.reduce((curNumber,item) =>{
        return curNumber + item.amount;
    },0);

    const btnClass = `${classes.button} ${bthIsHighlited ? classes.bump : ''}`;

    useEffect(() =>{
        if(items.length === 0){
            return;
        }
        setbtnIsHighlited(true);

      const timer =  setTimeout(() =>{
            setbtnIsHighlited(false);
        },300);

        return () =>{
            clearTimeout(timer);
        }
    }, [items])

return(
    <React.Fragment>
       <button className={btnClass} onClick={ctx.onClick}> 
        <span className={classes.icon}>
            <CartIcon />
        </span>
       <span>Your Cart</span>
       <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    </React.Fragment>
)

};

export default HeaderCartButton;