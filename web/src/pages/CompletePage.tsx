import Button from '../components/Button';
import cookie from '../assets/cookie.png';

function CompletePage() {
  return (
    <div className="page one-button-bottom">
      <h1>Complete</h1>
      <p>Congrats for making it to the end of the demo. Have a cookie for your efforts:</p>
      <img src={cookie} alt={'Cookie'} />
      <div className="page-bottom">
        <Button to="/" variant='secondary'>Start again</Button>
      </div>
    </div>
  );
}

export default CompletePage;
