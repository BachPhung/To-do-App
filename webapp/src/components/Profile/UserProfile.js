import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = ({userID}) => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm userID={userID} />
    </section>
  );
};

export default UserProfile;
