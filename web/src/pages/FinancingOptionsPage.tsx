import { Link } from "react-router-dom";
import Button from "../components/Button";

function FinancingOptionsPage() {
  return (
    <div className="page">
      <h1>Financing options</h1>
      
      <FinancingOption
        to="/about"
        name="Frictionless"
        description="Compare lenders' tailored rates based on your bank data"
        fontFamily="Caveat"
        />

      <FinancingOption
        name="Ye Olde Comparison Co."
        description="Get quotes from lenders based on&nbsp;your credit score"
        fontFamily="Garamond, serif"
        />

      <FinancingOption
        name="Pay outright"
        description="Pay for your chosen vehicle in full, and&nbsp;it’s all yours"
        fontFamily="Open Sans"
        />
    </div>
  );
}

function FinancingOption({ to = '/notimplemented', name, description, fontFamily }: { to?: string, name: string, description: string, fontFamily: string }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'black' }}>
    <div className="card" style={{ textAlign: 'center'}}>
      <h2 style={{ fontFamily, fontSize: '28px', marginBottom: '8px' }}>{name}</h2>
      <p style={{ marginTop: 0, marginBottom: '16px' }}>{description}</p>
      <Button>Select</Button>
    </div>
  </Link>
  )
}

export default FinancingOptionsPage;
