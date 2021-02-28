import React, {useState} from 'react'

export function useForm(initVals, validate, validateOnChange=false) {
    // manages the internal state of a form
    const [vals, setVals] = useState(initVals);
    const [errs, setErrs] = useState({});

    // expects event object with target and 'name', 'value' keys
    // hence, automatically replaces 'name' with associated value (as the key) and assigns the value
    const onChange = e => {
        const { name, value } = e.target;
        setVals({
            ...vals,
            [name]: value
        });
        if(validateOnChange) {
            validate({[name]: value});
        }
    }

    const reset = () => {
        setVals(initVals);
        setErrs({});
    }

    return ({
        vals,
        setVals,
        errs,
        setErrs,
        onChange,
        reset
    });
}



export function Form(props) {

    const { children, onSubmit, ...other } = props;

    return (
        <form 
            autoComplete="off" 
            onSubmit={onSubmit}
            {...other}>
            {children}
        </form>
    )
}

