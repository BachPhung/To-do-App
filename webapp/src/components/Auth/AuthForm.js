import { useState, useRef , useContext, useEffect} from 'react';
import { useHistory } from 'react-router';
import signupService from '../services/user';
import loginService from '../services/login'
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import ErrorModal from '../UI/ErrorModal';

const AuthForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory() ;
  const authCtx = useContext(AuthContext);
  


  const [name, setName] = useState() ;
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const nameChangeHandler =(event) => {
    setName(event.target.value);
  }
  
  const errorHandler = () => {
    setError(null);
}

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const enterEmail = emailInputRef.current.value ;
    const enterPassword = passwordInputRef.current.value ;
    const passwordHash = enterPassword;
    const password = enterPassword ;
    

  if (isLogin){
    console.log('try to signin');
    try {
      const a = await loginService.login({ username: enterEmail , password});
      console.log(a);
      authCtx.login(a.token);
      history.replace('/');
      props.setUserID(a.ID);
      props.setUserToken(a.token);
      props.setUser(a.name);

    } catch(exception) {
      setError({
        title: 'Log in failed',
        message: 'Please try again',
    })
      console.log('fetch error 2');
      setTimeout(()=>{
      },5000)
    }

  } else {
    console.log('create accout with ',enterEmail,name,passwordHash);
    try{
      const a = await signupService.signUp({username: enterEmail,name,passwordHash})
      console.log(a);
      setError({
        title: 'Create account successfully',
        message: 'You can use the information to log in.',
    })
    }
    catch(exeption){
      setError({
        title: 'Create account failed',
        message: 'Username existed.',
    })
      setTimeout(()=>{
      },5000)
    }
  };
}



  return (
    
      
    <section className={classes.auth}>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler} />}
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit = {submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your username</label>
          <input type='text' id='email' required  ref = {emailInputRef}/>
        </div>

        {!isLogin && <div className={classes.control}>
          <label htmlFor='email'>Your Name</label>
          <input type='text' id='name' required  onChange = {nameChangeHandler}/>
        </div> }
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref= {passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    
  );
};

export default AuthForm;
