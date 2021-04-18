import Register from "./features/users/Register/Register";
import RegisterTemplate from "./templates/Register";
import "./css/style.css";
import Login from "./features/users/Login/Login";
import { Switch } from "react-router";
import Feed from "./features/feed/Feed";
import HomeTemplate from "./templates/Home";

function App() {
  return (
    <>
      <Switch>
        <HomeTemplate Component={Feed} exact path="/" />
        <RegisterTemplate Component={Register} path="/register"/>
        <RegisterTemplate Component={Login} path="/login"/>
      </Switch>
    </>
  );
}

export default App;
