import AuthForm from '../components/Auth/AuthForm';


const AuthPage = (props) => {

  return <AuthForm  setUserID = {props.setUserID} setUserToken = {props.setUserToken} setUser = {props.setUser}/>;
};

export default AuthPage;
