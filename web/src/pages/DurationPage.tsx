import { useEffect, useRef, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '../components/Button';
import axios from 'axios';
import { streamId } from '../analytics';
import config from '../config';

function DurationPage() {
  const [months, setMonths] = useState(60);
  const [linkToken, setLinkToken] = useState<string>('');
  // Reference that the onSuccess callback can use. Standard React state is
  // immutable, and months would be otherwise be captured by the onSuccess
  // function closure.
  const monthsRef = useRef(months);
  monthsRef.current = months;

  useEffect(() => {
    if (!linkToken) {
      axios.post(`${config.api.url}/linkToken`, { id: streamId }).then(res => setLinkToken(res.data.linkToken));
    }
  }, [linkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken: string) => {
      axios.post(`${config.api.url}/decide`, { publicToken, months: monthsRef.current })
        .then(res => window.location.href = `/result#monthlyCost=${res.data.monthlyCost}&finalPurchaseCost=${res.data.finalPurchaseCost}&finalExchangeValue=${res.data.finalExchangeValue}&months=${monthsRef.current}`)
    },
    onExit: (err: any) => {
      if (err) window.location.href = '/notimplemented'
    }
  });

  return (
    <div className="page one-button-bottom">
      <h1>Contract length</h1>
      <p>How long would you like financing for?</p>
      <input type="range" style={{ width: '97%', margin: 0 }} min={12} max={120} step={3} value={months} onChange={(e) => setMonths(parseInt(e.target.value))} />
      <p>{months} months {`(that's ${(months/12).toString().replace('.5', '½').replace('.25', '¼').replace('.75', '¾')} year${months === 12 ? '' : 's'})`}</p>
      <div className="page-bottom">
        <Button onClick={() => open()} disabled={!linkToken || !ready}>Next</Button>
      </div>
    </div>
  );
}

export default DurationPage;
