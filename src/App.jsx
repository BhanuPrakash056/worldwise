import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="app" element={<AppLayout />}>
          <Route index path="login" element={<p>List of Cities</p>}></Route>
            <Route path="cities" element={<p>List of the cities</p>}></Route>
            <Route path="country" element={<p>Countries</p>}></Route>
            <Route path="form" element={<p>form</p>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      "hello"
    </>
  );
}

export default App;
