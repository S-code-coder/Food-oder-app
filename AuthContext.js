import React,{useState,useReducer} from "react"


const defaultCartState ={
    items: [],
    totalAmount : 0
}

const cartReducer = (state,action) =>{
    if(action.type === "ADD"){
        const updatedTotalAmount = state.totalAmount + action.payLoad.price * action.payLoad.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payLoad.id);
        const existingCartItem = state.items[existingCartItemIndex];

       
        let updatedItems;

        if(existingCartItem){
          const  updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.payLoad.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
             updatedItems = state.items.concat(action.payLoad);
        }


        return{
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payLoad);

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.payLoad)
        }else{
            const updatedItem = {...existingCartItem, amount : existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    if(action.type === 'CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}


const AuthContext = React.createContext({
    cartDisplay : false,
    onClick : () =>{},
    onClose : () =>{},
    items : [],
    totalAmount : 0,
    addItem : (item) =>{},
    removeItem : (id) =>{},
    orderFormDisplay : false,
    showForm:()=>{},
    hideForm:()=>{},
    clearCart:()=>{}
})

 export const AuthContextProvider = (props) =>{
    const [cartDisplay , setCartDisplay] = useState(false);
    const [orderFormDisplay,setOrderFormDisplay] = useState(false);
  const [cartState,dispatchCartAction]  = useReducer(cartReducer,defaultCartState)
    const onClickHandler = () =>{
        setCartDisplay(!cartDisplay)
    }
    const onCloseHandler = () =>{
        setCartDisplay(!cartDisplay)
    };
    const addItemToCartHandler = (item) =>{
         dispatchCartAction({type : 'ADD', payLoad: item})
    };
    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type : 'REMOVE' , payLoad : id})
    };
    const showOrderFormHandler = () =>{
        setOrderFormDisplay(!orderFormDisplay)
    };
    const hideOrderFormHandler = () =>{
        setOrderFormDisplay(!orderFormDisplay)
    }
    const clearCart =  () =>{
        dispatchCartAction({type:'CLEAR'})
    }
    const cartContext ={
        cartDisplay : cartDisplay,
        orderFormDisplay:orderFormDisplay,
        onClick : onClickHandler,
        onClose : onCloseHandler,
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
        showForm:showOrderFormHandler,
        hideForm:hideOrderFormHandler,
        clearCart:clearCart
    }

    return <AuthContext.Provider value={cartContext}>{props.children}</AuthContext.Provider>
}

export default AuthContext;