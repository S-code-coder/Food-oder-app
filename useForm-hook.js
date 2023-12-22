import { useReducer } from "react";
const defaultState = {
    value : '',
    isTouched : false
};
const inputStateReducer = (state,action) =>{
    if(action.type === 'AddInput'){
        return {
            value : action.payLoad,
            isTouched : state.isTouched
        }
    };
    if(action.type === 'InputBlur'){
        return {
            value : state.value,
            isTouched : true
        }
    };
    if(action.type === 'ResetInput'){
        return {
            value : '',
            isTouched: false
        }
    }
    return defaultState;
}
const useForm = (validate) =>{
    const [inputState,dispatchAction] = useReducer(inputStateReducer,defaultState);

    const inputChangeHandler = e =>{
        dispatchAction({type:'AddInput',payLoad:e.target.value})
    };
    const inputBlurHandler = e =>{
        dispatchAction({type:'InputBlur'})
    };
    const resetHandler = e =>{
        dispatchAction({type:'ResetInput'})
    };

    const enteredValueIsValid = validate(inputState.value);
    const enteredValueHasError = !enteredValueIsValid && inputState.isTouched

    return {
     value:inputState.value,inputChangeHandler,inputBlurHandler,resetHandler,isValid : enteredValueIsValid,hasError:enteredValueHasError
    }

}

export default useForm;
