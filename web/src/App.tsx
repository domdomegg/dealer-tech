import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import FinancingOptionsPage from './pages/FinancingOptionsPage';
import AboutPage from './pages/AboutPage';
import DurationPage from './pages/DurationPage';
import ResultPage from './pages/ResultPage';
import CompletePage from './pages/CompletePage';
import NotImplementedPage from './pages/NotImplementedPage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from "react";
import a from "./analytics";

function App() {
  const history = useHistory()
  useEffect(() => history.listen(({ pathname }) => a({ name: 'navigate', pathname })));

  return (
      <Switch>
        <Route path="/" component={FinancingOptionsPage} exact />
        <Route path="/about" component={AboutPage} />
        <Route path="/duration" component={DurationPage} />
        <Route path="/result" component={ResultPage} />
        <Route path="/complete" component={CompletePage} />
        <Route path="/notimplemented" component={NotImplementedPage} />
        <Route component={NotFoundPage} />
      </Switch>
  );
}

export default App;
