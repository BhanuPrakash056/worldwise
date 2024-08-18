import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import City from "./components/City";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";
import { CitiesProvider } from "./context/CitiesContext";
function App() {
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="app" element={<AppLayout />}>
              <Route index element={<CityList />}></Route>
              <Route path="cities/:id" />
              <Route path="cities" element={<CityList />}></Route>
              <Route path="countries" element={<CountriesList />}></Route>
              <Route path="form" element={<p>form</p>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
