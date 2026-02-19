
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Loader } from "../../src/components/loader,";
import OrderDetailsModal from "../../src/components/orderDetailsModal";


export default function AdminOdersPage() {
  const [orders, setOrders] = useState([]);
  const[isLoading,setIsLoding]= useState(true);
  const[isModelOpen,setIsModelOpen]= useState(false);
  const[selectedOrder,setSelectedOrder]= useState(null);

  const closeModel = () => {
  setIsModelOpen(false);
  setSelectedOrder(null);
};

const refresh = () => {
  setIsLoding(true);
  closeModel();
};

  const navigate = useNavigate();

  useEffect(() => {
    if(isLoading){
        const token = localStorage.getItem("token");
        if (token == null) {
          navigate("/login")
          return
        }
      axios
      .get(import.meta.env.VITE_API_URL + "/api/orders",{
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
        setIsLoding(false);
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6">
        <OrderDetailsModal
  isModelOpen={isModelOpen}
  selectedOrder={selectedOrder}
  closeModel={closeModel}
  refresh={refresh}
/>
        {/* { isModelOpen && ( <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center "> <div className="w-[400px] h-[200px] bg-primary relative flex flex-col justify-center items-center"> </div> </div> ) } */}
    
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-primary/40">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Orders</h1>
            <p className="text-base text-secondary/70">
              Manage your cosmetic Orders list
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          {isLoading?<Loader/>:
            <table className="w-full text-left">
            <thead className="bg-primary/70 border-b border-white/15">
              <tr className="text-base font-semibold text-secondary uppercase">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Number of Items</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {orders.map((item) => (
                <tr
                  key={item.orderID}
                  className="hover:bg-white/10 transition text-base"
                  onClick={
                    ()=>{
                        setSelectedOrder(item);
                        setIsModelOpen(true);
                    }
                  }
                >
                  <td className="px-6 py-4 font-semibold text-secondary">
                    {item.orderID}
                  </td>
                   

                  <td className="px-6 py-4 font-semibold text-secondary">
                    {item.items.length}
                  </td>
                  <td className="px-6 py-4 font-semibold text-secondary">
                    {item.customerName}
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                     {item.email}
                  </td>

                  <td className="px-6 py-4 text-secondary/70 line-through">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 text-secondary/70 ">
                     {item.address}
                  </td>
                  <td className="px-6 py-4 text-secondary/70 ">
                     {"LKR "+item.total.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-secondary/70 ">
                     {item.status}
                  </td>

                  <td className="px-6 py-4 text-secondary/70">
                     {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-center items-center text-xl">
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/15 bg-primary/40 text-base text-secondary/80">
          Showing <span className="font-bold">{orders.length}</span> Orders
        </div>
      </div>
    </div>
  );
}

// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

// // export  default function AdminProductPage(){

// //     const[products,setProducts]= useState([]);

// //     useEffect( ()=>{
// //         axios.get(import.meta.env.VITE_API_URL+"/api/products").then(
// //         (response)=>{
// //             console.log(response.data);
// //             setProducts(response.data);
// //         }
// //     )
// //     } , [])

// //     return(
// //         <div className="w-full h-full p-[10px]">
// //             <table className="border w-full text-center">
// //                 <thead>
// //                     <tr>
// //                         <th>Image</th>
// //                         <th>Product ID</th>
// //                         <th>Product Name</th>
// //                         <th>Product Price</th>
// //                         <th>Labled Price</th>
// //                         <th>Catogory</th>
// //                         <th>Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                 {products.map(
// //                     (item)=>{
// //                         return(
// //                         <tr key={item.productID}>
// //                             <td><img src={item.images[0]} className="w-16 h-16 object-cover"/></td>
// //                             <td>{item.productID}</td>
// //                             <td>{item.name}</td>
// //                             <td>{item.price}</td>
// //                             <td>{item.labalPrice}</td>
// //                             <td>{item.catagory}</td>
// //                             <td>
// //                                 <div className="flex fles-row gap-[20px] justify-center items-center">
// //                                     <FaRegTrashAlt className="hover:text-red-600"/>
// //                                     <FaRegEdit className=" hover:text-accent"/>

// //                                 </div>
// //                             </td>
// //                         </tr>
// //                         );
// //                     })}
// //                 </tbody>

// //             </table>
// //         </div>
// //     )
// // }
