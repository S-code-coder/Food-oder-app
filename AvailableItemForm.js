import React,{useRef,useState} from "react";
import Input from "../UI/Input";
// import AuthContext from "../Context/AuthContext";
import Classes from "./AvailableItemForm.module.css";

const AvailableForm = props =>{
    // const ctx = useContext(AuthContext);
    const [AmountIsvalid,setAmountIsvalid] = useState(true);
    const AmountInputRef = useRef();
const submitHandler = event =>{
    event.preventDefault();
    const enteredAmount = AmountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
        setAmountIsvalid(false)
        return;
    }

    props.onAddToCart(enteredAmountNumber);
}

    return(
        <form className={Classes.form} onSubmit={submitHandler}>
            <Input ref={AmountInputRef} label="Amount" input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                 defaultValue: '1',
            }}/>
            <button>+ Add</button>
            {!AmountIsvalid && <p>Please enter a valid amount(1-5)</p>}
        </form>
    )
}

export default AvailableForm;