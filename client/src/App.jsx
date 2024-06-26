import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import AboutTheGame from "./Pages/AboutTheGame";
import Authors from "./Pages/Authors";
import Competitions from "./Pages/Competitions/Competitions";
import { Home } from "./Pages/Home";
import Level from "./Pages/Levels/Level";
import Play from "./Pages/Play";
import Profile from "./Pages/Profile";
import Question from "./Pages/Questions/Question";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/about-the-game" element={<AboutTheGame />} />
          <Route path="/play" element={<Play />} />
          <Route path="/play/level/:level" element={<Level />} />
          <Route
            path="/play/level/:level/question/:question/:id"
            element={<Question />}
          />
          <Route path="/competitions" element={<Competitions />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
