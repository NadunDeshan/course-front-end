import { Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full bg-primary p-2.5 flex">
            <div className="w-[300px] h-full bg-primary">
            </div>
            <div className="h-full w-[calc(100%-300px)] border-[2px] border-accent rounded-[20px]">

                <Routes path="/">
                    <Route path="/" element={<h1>Dashbord</h1>}/>
                    <Route path="/products" element={<h1>Products</h1>}/>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                </Routes>
            </div>
        </div>
    )

}