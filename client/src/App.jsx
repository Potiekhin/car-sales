import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AddCar from "./pages/AddCar";
import Car from "./pages/Car";
import UpdateCar from "./pages/UpdateCar";
import FullScreenImages from "./pages/FullScreenImages";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/update-car/:carId" element={<UpdateCar />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/car/:carId" element={<Car />} />
        <Route path="/car/:carId/images" element={<FullScreenImages />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
