import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import ProvinceWeather from "./pages/ProvinceWeather";
import RecentProvinces from "./pages/RecentProvinces";



export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />


        <Route path="/provincia/:slug" element={<ProvinceWeather />} />


        <Route path="/recientes" element={<RecentProvinces />} />


        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>



    </BrowserRouter>

  );

}