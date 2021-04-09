import Button from '../components/Button';

function ResultPage() {
  const hash = new URLSearchParams(window.location.hash.slice(1));;

  return (
    <div className="page two-button-bottom">
      <h1>Quote</h1>
      <p><span className="logotype">Frictionless</span> has found you a personal contract purchase (PCP) quote for your <i>Ford Focus 2019</i>.</p>
      <p><span style={{ fontSize: '275%' }}>£{hash.get('monthlyCost')}</span>pm for {hash.get('months')} months</p>
      <p>After which you may pay £{hash.get('finalPurchaseCost')} to own the car, or can exchange it with a £{hash.get('finalExchangeValue')} trade-in value.</p>
      <div className="page-bottom">
        <Button to="/" variant='secondary'>Change financing option</Button>
        <Button to="/complete">Continue</Button>
      </div>
    </div>
  );
}

export default ResultPage;
