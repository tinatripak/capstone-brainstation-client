import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import AboutUs from "./pages/AboutUs/AboutUs";
import Poetry from "./pages/Poetry/Poetry";
import PoetryItem from "./pages/PoetryItem/PoetryItem";
import MyAccount from "./pages/Account/MyAccount/MyAccount";
import EditAccount from "./pages/Account/EditAccount/EditAccount";
import MyPoems from "./pages/Account/MyPoems/MyPoems";
import EditPoem from "./pages/Account/EditPoem/EditPoem";
import FavouritePoems from "./pages/Account/FavouritePoems/FavouritePoems";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/poem/:id" element={<PoetryItem />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/account"
            element={<ProtectedRoute element={MyAccount} />}
          />
          <Route
            path="/account/edit"
            element={<ProtectedRoute element={EditAccount} />}
          />
          <Route
            path="/account/poems"
            element={<ProtectedRoute element={MyPoems} />}
          />
          <Route
            path="/account/poems/:id/edit"
            element={<ProtectedRoute element={EditPoem} />}
          />
          <Route
            path="/account/fav-poems"
            element={<ProtectedRoute element={FavouritePoems} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
