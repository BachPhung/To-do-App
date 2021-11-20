import React,{useState} from "react";



const Todo = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(props.title);
    const [isCompleted, setIsCompleted] = useState(props.completed);

    const divDoubleClickHandler = () => {
        setIsEditing(true);
    };

    const inputClickHandler = (event) => {
        props.editTodo({content: value});
        
        setIsEditing(false)
    };

    const editChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const compeleteClickHandler = () => {
        props.editTodo({important: !isCompleted})
        setIsCompleted((prevState) => !prevState);
    }
    return (
        isEditing ? 
        <div className = "row" >
            <div className = "column seven wide">
            <div className="ui input fluid" > 
                <input
                    autoFocus = {true}
                    value = {value}
                    onChange = {editChangeHandler}    
                />
            </div>
            </div>
            <button onClick = {inputClickHandler}  className= "ui button circular icon green">
                        <i className="white check icon"></i>
            </button>
        </div>
         :
        <div style={{ display: 'flex',
                      flexDirection: 'row'}} className = "row" >
                <div className = "column five wide" onDoubleClick = {divDoubleClickHandler}>
                    <h3 style={{fontSize:"2.2vw" }} className= {"ui header" + (isCompleted ? " green" : "white")} >{value}</h3> 
                </div>

                <div className = "column one wide" onClick={compeleteClickHandler}>
                    <button style={{fontSize:"1.3vw" }} className= {"ui button circular icon" + (isCompleted ? " blue" : " green") }>
                        <i className="white check icon"></i>
                    </button>
                </div>

                <div className = "column one wide">
                    <button 
                        
                        onClick = {props.remove}
                        className= "ui button circular icon red"
                        style = { { 
                            marginLeft: '10px',
                            fontSize:"1.3vw"
                        }}>
                        <i className="white remove icon"></i>
                    </button>
                </div>
        </div>
        
    );
};

export default Todo ;