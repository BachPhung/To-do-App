import StartingPageContent from '../components/StartingPage/StartingPageContent';

const HomePage = ({checkAuth}) => {
  return <StartingPageContent auth={checkAuth}/>;
};

export default HomePage;
