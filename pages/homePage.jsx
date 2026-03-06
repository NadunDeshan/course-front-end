import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductOverview from "./admin/productOverveiw";
import CartPage from "./admin/cart";
import CheckoutPage from "./admin/checkout";
import ProductPage from "./admin/productPage";
import PremiumHome from "../src/components/landingHome";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";

export default function HomePage() {
  return (
    <div className="">
      <Header />

      <Routes path="/">
        <Route path="/" element={<PremiumHome />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/overview/:id" element={<ProductOverview />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/*" element={<h1>404 Not Found page</h1>} />
      </Routes>
    </div>
  );
}


// import { Route, Routes } from "react-router-dom";
// import Header from "../src/components/header";
// import ProductOverview from "./admin/productOverveiw";
// import CartPage from "./admin/cart";
// import CheckoutPage from "./admin/checkout";
// import ProductPage from "./admin/productPage";
// import LandingHome from "../src/components/landingHome";

// export default function HomePage(){

//     return(
//         <div className="w-full min-h-screen bg-primary">
//    {/* //     <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center"> */}
//         <Header/>

//         <Routes path="/">
//             <Route path="/" element={<LandingHome/>}/>
//             <Route path="/products" element={<ProductPage/>}/>
//             <Route path="/contact" element={<h1>Contact List</h1>}/>
//             <Route path="/about" element={<h1>About List</h1>}/>
//             <Route path="/overview/:id" element={<ProductOverview/>}/>
//             <Route path="/cart" element={<CartPage/>}/>
//             <Route path="checkout" element={<CheckoutPage/>}/>
//             <Route path="/*" element={<h1>404 Not Found page</h1>}/>
//         </Routes>
//         </div>
//     )
// }