import Register from "./users/Register/Register";
import RegisterTemplate from "./templates/Register";
import "./css/style.css";
import Login from "./users/Login/Login";
import { Switch } from "react-router";

function App() {
  return (
    <>
      <Switch>
        <RegisterTemplate Component={Login} path="/login" />
        <RegisterTemplate Component={Register} path="/register" />
      </Switch>
    </>
  );
}

export default App;
