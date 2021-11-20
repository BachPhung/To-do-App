import React,{useState, useEffect} from "react";
import ErrorModal from "../UI/ErrorModal";
import noteService from "../services/notes"
import './Form.css'

const Form = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState();
    const inputChangeHandler = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        console.log(props.userID);
        console.log(props.userToken);
        console.log(props.user);
        noteService.setToken(props.userToken);
    },[]);

    const errorHandler = () => {
        setError(null);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (inputValue.trim().length <= 5 ){
                setError({
                    title: 'Invalid input',
                    message: 'Please enter some thing(> 5 characters).',
                })
                return ;
        }
        
        const noteObject = {
            
            content: inputValue,
            important: false ,
            date: new Date().toISOString(),
            user: props.user
            
        }
        props.addForm(noteObject);
        setInputValue('');
    }
    return (
        
    <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler} />}
        <form  className = "ui form" onSubmit= {onSubmitHandler}>
            <div className = "ui grid center aligned">
                <div className="row">
                    <div className="column five wide">
                        <input style = {{display: 'block',
                                         width: '100%',
                                        border:' 1px solid #ccc',
                                        font: 'inherit',
                                        lineHeight: '1.5rem',
                                        padding: '0 0.25rem' }} 
                            value = {inputValue}
                            onChange = {inputChangeHandler}
                            type = "text" 
                            placeholder="Enter something to do..."/>
                    </div>
                    <div className="column one wide">
                    <button  type = "submit" className = "ui button circular icon green" >
                        <i className= "white plus icon" ></i>
                    </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default Form ;