import { useState } from 'react';
import Button from '../components/Button';

function DurationPage() {
  const [months, setMonths] = useState(60);

  return (
    <div className="page one-button-bottom">
      <h1>Contract length</h1>
      <p>How long would you like financing for?</p>
      <input type="range" style={{ width: '97%', margin: 0 }} min={12} max={120} step={3} value={months} onChange={(e) => setMonths(parseInt(e.target.value))} />
      <p>{months} months {`(that's ${(months/12).toString().replace('.5', '½').replace('.25', '¼').replace('.75', '¾')} year${months === 12 ? '' : 's'})`}</p>
      <div className="page-bottom">
        {/* TODO: link to banks */}
        <Button>Next</Button>
      </div>
    </div>
  );
}

export default DurationPage;
