import React ,{useState} from 'react';
import userService from '../services/user'
import classes from './ProfileForm.module.css';


const ProfileForm = ({userID}) => {
  const [pass,setPass]=useState('')
  const  handlecChangePassword = async (event)=>{
    event.preventDefault()
    if(pass.length > 8)
    {await userService.changePass(userID,{pass});
      setPass('');
    }
  }
  return (
    <form className={classes.form} onSubmit={handlecChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' name='passwordHash' value={pass} id='new-password' onChange={({target})=>{setPass(target.value);}} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
