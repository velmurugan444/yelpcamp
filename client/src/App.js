import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Home/header";
import Viewcampground from "./components/campground/view/view_campground";
import Form from "./components/signup/form";
import Login from "./components/Login/form";
import Addcampground from "./components/campground/Add/campground";
import Campgrounddetails from "./components/campground/view/campgrounddetails";
import Usercampground from "./components/campground/view/usercampground";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Header />} />
        <Route exact path="/viewcampground" element={<Viewcampground />} />
        <Route exact path="/signup" element={<Form />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addcampground" element={<Addcampground />} />
        <Route
          exact
          path="/campgrounddetails"
          element={<Campgrounddetails />}
        />
        <Route exact path="/usercampground" element={<Usercampground />} />
      </Routes>
    </div>
  );
}

export default App;
