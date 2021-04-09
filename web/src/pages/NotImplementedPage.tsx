import Button from "../components/Button";
import { useHistory } from "react-router-dom";

function NotImplementedPage() {
  const history = useHistory();

  return (
    <div className="page">
      <h1>Not implemented</h1>
      <p>This page has not been implemented as part of the demo</p>
      <Button onClick={() => history.goBack()}>Go back</Button>
    </div>
  );
}

export default NotImplementedPage;
