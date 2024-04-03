import {Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";

function App() {
  return(
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
    </>

  )
}

export default App
