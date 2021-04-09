import Button from "../components/Button";
import { useHistory } from "react-router-dom";

function NotImplementedPage() {
  const history = useHistory();

  return (
    <div className="page">
      <h1>Not found</h1>
      <p>The requested page could not be found</p>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <Button to="/">Return home</Button>
    </div>
  );
}

export default NotImplementedPage;
