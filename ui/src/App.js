import Register from "./features/user/Register";
import RegisterTemplate from "./templates/Register";
import "./styles/css/style.css";
import Login from "./features/user/Login";
import { Switch } from "react-router";
import MainFeed from "./features/posts/MainFeed";
import HomeTemplate from "./templates/Home";
import Profile from "./features/Profile";
import ThreeSecs from "./templates/ThreeSecs";
import SuggestedFriends from "./features/friends/SuggestedFriends";

function App() {
  return (
    <>
      <Switch>
        <ThreeSecs Component={SuggestedFriends} path="/requests" />
        <HomeTemplate Component={Profile} path="/profile/:id" />
        <RegisterTemplate Component={Register} path="/register"/>
        <RegisterTemplate Component={Login} path="/login"/>
        <HomeTemplate Component={MainFeed} exact path="/" />
      </Switch>
    </>
  );
}

export default App;
