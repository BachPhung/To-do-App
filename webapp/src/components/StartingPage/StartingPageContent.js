import './StartingPageContent.css';
import ImgTeam from './TEAM.svg'
import Img19 from './19.svg'
const StartingPageContent = ({auth}) => {
  return (
    <div class='container'>
    <div class="ani-background">
    <img src={ImgTeam} alt="Team" class="team"></img>
    <img src={Img19} alt="19" class="nineteen"></img>
    <h2 class="byline" id="byline">TO DO LIST</h2>
  </div>
  </div>
  );
};

export default StartingPageContent;
