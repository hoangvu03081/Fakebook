import Register from "./features/user/Register/Register";
import RegisterTemplate from "./templates/Register";
import "./styles/css/style.css";
import Login from "./features/user/Login/Login";
import { Switch } from "react-router";
import Posts from "./features/posts/Posts";
import HomeTemplate from "./templates/Home";

function App() {
  return (
    <>
      <Switch>
        <HomeTemplate Component={Posts} exact path="/" />
        <RegisterTemplate Component={Register} path="/register"/>
        <RegisterTemplate Component={Login} path="/login"/>
      </Switch>
    </>
  );
}

export default App;
