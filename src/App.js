import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";

function App() {
  //dispath 선언

  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/test" exact={true} component={Test} />
        <Route path="/test2" exact={true} component={Test2} />
      </Switch>
    </>
  );
}

export default App;

//
