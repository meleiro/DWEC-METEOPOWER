import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import ProvinceWeather from "./pages/ProvinceWeather";



export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />


        <Route path="/provincia/:slug" element={<ProvinceWeather />} />


        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>



    </BrowserRouter>

  );

}