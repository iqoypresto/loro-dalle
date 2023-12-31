import "./App.css";
import {
  Home,
  Login,
  Register,
  RegisterSuccess,
  UserDashboard,
  AdminDashboard,
  UserSection,
  SampahSection,
  PointSection,
  ProductSection,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  AOS.init();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-user-section" element={<UserSection />} />
          <Route path="/admin-sampah-section" element={<SampahSection />} />
          <Route path="/admin-point-section" element={<PointSection />} />
          <Route path="/admin-product-section" element={<ProductSection />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
