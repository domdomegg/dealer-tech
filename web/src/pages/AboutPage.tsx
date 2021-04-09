import ford from '../assets/ford.png'
import Button from '../components/Button';

function AboutPage() {
  return (
    <div className="page one-button-bottom">
      <h1>About</h1>
      <p><span className="logotype">Frictionless</span> can help find you a better rate for purchasing your <i>Ford Focus 2019</i>, by connecting with your bank to get tailored quotes.</p>
      <img src={ford} alt={'Ford Focus 2019'} />
      <p>This no-obligation quote won’t affect your credit report.</p>
      <div className="page-bottom">
        <Button to="/duration">Next</Button>
      </div>
    </div>
  );
}

export default AboutPage;
