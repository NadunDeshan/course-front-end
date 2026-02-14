import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";

export default function HomePage(){

    return(
        <div className="w-full h-full bg-primary">
        <Header/>

        <Routes path="/">
            <Route path="/" element={<h1>Welcome to the Home Page</h1>}/>
            <Route path="/products" element={<h1>Product List</h1>}/>
            <Route path="/contact" element={<h1>Contact List</h1>}/>
            <Route path="/about" element={<h1>About List</h1>}/>
            <Route path="/*" element={<h1>404 Not Found page</h1>}/>
        </Routes>
        </div>
    )
}