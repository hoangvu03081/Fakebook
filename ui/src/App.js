import Register from "./features/user/Register";
import RegisterTemplate from "./templates/Register";
import "./styles/css/style.css";
import Login from "./features/user/Login";
import { Switch } from "react-router";
import Posts from "./features/posts/Posts";
import HomeTemplate from "./templates/Home";
import Profile from "./features/Profile";

function App() {
  return (
    <>
      <Switch>
        <HomeTemplate Component={Posts} exact path="/" />
        <HomeTemplate Component={Profile} path="/profile/:id" />
        <RegisterTemplate Component={Register} path="/register"/>
        <RegisterTemplate Component={Login} path="/login"/>
      </Switch>
    </>
  );
}

export default App;
