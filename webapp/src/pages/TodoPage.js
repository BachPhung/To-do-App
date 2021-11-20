import React,{useState,useEffect} from 'react';
import Form from '../components/Todo/Form';
import Section from '../components/Todo/Section';
import List from '../components/Todo/List';
import noteService from '../components/services/notes';
import '../components/Todo/TodoList.css'

const appTitle = "To-do App";

const list = [
  {id: 1 ,title: "Test #1" , completed: false},
  {id: 2,title: "Test #2", completed: false},
  {id: 3, title: "Test #3", completed: false}
]



const TodoPage = (props) => {

  const [todoList, setTodoList] = useState(list);
  
  

  const addTodo = async (item) => {
    const data = await noteService.create(item);
    
    setTodoList((oldList) => [...oldList,data])

    console.log(todoList);
  } 

  useEffect(() => {
    async function fetchData() {
      const fetchValue = await noteService.getAll(props.userID);
      console.log(fetchValue.notes);
      setTodoList(fetchValue.notes);
    }
    fetchData();
  },[props.userID]);
 
  

  const removeTodo = async (id) => {
    await noteService.clear(id);
    setTodoList((oldList) => oldList.filter((item) => item.id !== id ));
  } 

  const editTodo = async (id,item) => {
    try {
    const a = await noteService.update(id,item);
    console.log(a);
    } catch {
      console.log('fetch edit fail');
    }
  };
  return (
    <div id='container-todo-form'>
    <div className="ui-container-center-aligned">
        <h1 className="header">{appTitle}</h1>    
        <Form userID = {props.userID} userToken = {props.userToken} user = {props.user} addForm = {addTodo}/>     
        <List 
              editTodo = {editTodo}
              userID = {props.userID} 
              userToken = {props.userToken} 
              user = {props.user}  remove={removeTodo} 
              list = {todoList}/>
    </div>
    </div>
  )
} 
export default TodoPage;