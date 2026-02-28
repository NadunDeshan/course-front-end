import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import { ProductPage } from "./admin/productPage";
import ProductOverview from "./admin/productOverveiw";
import CartPage from "./admin/cart";
import CheckoutPage from "./admin/checkout";

export default function HomePage(){

    return(
        <div className="w-full h-full bg-purple-500">
        <Header/>

        <Routes path="/">
            <Route path="/" element={<h1>Welcome to the Home Page</h1>}/>
            <Route path="/products" element={<ProductPage/>}/>
            <Route path="/contact" element={<h1>Contact List</h1>}/>
            <Route path="/about" element={<h1>About List</h1>}/>
            <Route path="/overview/:id" element={<ProductOverview/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="checkout" element={<CheckoutPage/>}/>
            <Route path="/*" element={<h1>404 Not Found page</h1>}/>
        </Routes>
        </div>
    )
}