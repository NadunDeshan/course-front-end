import { Route, Routes ,Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { LuBoxes } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProduct";
import { AddProductPage } from "./admin/adminAddNewProduct";

export default function AdminPage(){
    return(
    
        <div className="w-full h-full bg-primary p-2.5 flex">
            <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
                
                {/* Orange brand box */}
                <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl px-4 gap-3 shadow-sm mb-[20px]">
                    <img
                        src="/logo.png"
                        alt="Crystal Beauty"
                        className="h-[52px] w-[52px] shrink-0 object-contain"
                    />

                    <div className="flex flex-col leading-tight">
                        <span className="text-white font-semibold text-lg">
                        Admin Panel
                        </span>
                    </div>
                    
                </div>
                <Link to ="/admin" className="w-full flex items-center gap-2 px-4 rounded-lg">
                <FaChartLine className=""/>
                    Dashboard
                </Link>
                 <Link to ="/admin/orders" className="w-full flex items-center gap-2 px-4 rounded-lg">
                <MdShoppingCartCheckout className="text-xl"/>
                    Orders
                </Link>
                <Link to ="/admin/products" className="w-full flex items-center gap-2 px-4 rounded-lg">
                <LuBoxes className="text-xl"/>
                    Products
                </Link>
                 <Link to ="/admin/users" className="w-full flex items-center gap-2 px-4 rounded-lg">
                <HiOutlineUsers className="text-xl"/>
                    Users
                </Link>
            </div>

        
        
            <div className="h-full w-[calc(100%-300px)] border-[4px] border-accent rounded-[20px] overflow-hidden">
                <div className=" h-full max-h-full w-full max-w-full overflow-y-scroll">
                <Routes path="/">
                    <Route path="/" element={<h1>Dashbord</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                    <Route path="/add-product" element={<AddProductPage/>}/>
                </Routes>
                </div>
            </div>
        </div>
    )
}
// <div className="w-full h-full bg-primary p-2.5 flex">
        //     <div className="w-[300px] h-full bg-primary flex flex-col items-center">
        //         <div className=" flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl">
        //             <img src="/logo.png" alt="crysalat beuty" className="has-[70px] object-cover"/>
        //             <span className=" text-black text-xl ml-4"></span>
        //         </div>