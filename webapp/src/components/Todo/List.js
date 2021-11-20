import React from "react";
import Todo from "./Todo";


const List = (props) => {
    const renderList = props.list.map((item) =>  <Todo title={item.content} 
                                                        completed = {item.important}
                                                        key ={item.id}
                                                        remove = {(e) => props.remove(item.id)}
                                                        editTodo = {(updatedItem) => props.editTodo(item.id, updatedItem)}
                                                        />)
    return (
        <div className="ui grid center aligned">
            {renderList}
        </div>
    )

}

export default List;