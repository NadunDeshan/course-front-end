import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [cart, setCart] = useState(location.state);

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  // ✅ Remove function (removes one item completely)
  function removeItem(index) {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.success("Item removed");
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to place and order");
      navigate("/login");
      return;
    }

    try {
      const items = [];
      for (let i = 0; i < cart.length; i++) {
        items.push({
          productID: cart[i].productID,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,
          customerName: name == "" ? null : name,
          items: items,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Order placed successfully");
      // optional UX: navigate("/orders") or navigate("/")
    } catch (error) {
      toast.error("Failed to place order fill the details correctly Name:.... Address:....");
      console.log(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Checkout
            </h1>
            <p className="text-secondary/70 text-sm mt-1">
              Confirm details & place your order
            </p>
          </div>

          <span className="text-sm sm:text-base text-secondary/70 font-semibold">
            {cart?.length || 0} item{cart?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Empty State */}
        {cart.length === 0 && (
          <div className="w-full bg-accent/10 border border-secondary/10 rounded-3xl p-10 text-center shadow-sm">
            <p className="text-secondary text-lg sm:text-xl font-bold">
              No items in checkout 🧾
            </p>
            <p className="text-secondary/70 mt-2">
              Go back and add products to your cart.
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
                  {/* Image */}
                  <div className="w-full sm:w-[130px] flex justify-center sm:justify-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[170px] sm:h-[120px] w-full sm:w-[130px] rounded-2xl object-cover border border-secondary/10"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-center sm:text-left">
                        <h2 className="text-lg sm:text-xl font-extrabold leading-snug">
                          {item.name}
                        </h2>
                        <p className="text-secondary/70 font-semibold mt-1">
                          {item.productID}
                        </p>
                      </div>

                      {/* ✅ Remove */}
                      <button
                        className="flex items-center gap-1 text-sm font-semibold
                                   text-red-600 bg-red-500/10 px-3 py-2 rounded-xl
                                   hover:bg-red-600 hover:text-white transition-all duration-200"
                        onClick={() => removeItem(index)}
                        aria-label="Remove item"
                      >
                        <BiTrash className="text-lg" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>

                    {/* Mobile Price */}
                    <div className="sm:hidden mt-4 flex flex-col items-center">
                      {item.labelledPrice > item.price && (
                        <span className="text-secondary/70 line-through text-sm font-semibold">
                          LKR {item.labelledPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-accent text-2xl font-extrabold">
                        LKR {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity + Desktop Price */}
                  <div className="w-full sm:w-[270px] flex sm:flex-col sm:items-end justify-between sm:justify-center gap-3">
                    {/* Qty Controls */}
                    <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end">
                      <div className="flex items-center gap-3 bg-primary/70 border border-secondary/10 rounded-2xl px-4 py-2 shadow-sm">
                        <button
                          className="h-10 w-10 rounded-xl bg-white/70 border border-secondary/10
                                     flex items-center justify-center hover:scale-105 transition"
                          onClick={() => {
                            const newCart = [...cart];
                            if (newCart[index].quantity > 1) {
                              newCart[index].quantity -= 1;
                            }
                            setCart(newCart);
                          }}
                          aria-label="Decrease quantity"
                        >
                          <CiCircleChevDown className="text-3xl text-secondary" />
                        </button>

                        <span className="text-2xl sm:text-3xl font-extrabold min-w-[44px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          className="h-10 w-10 rounded-xl bg-white/70 border border-secondary/10
                                     flex items-center justify-center hover:scale-105 transition"
                          onClick={() => {
                            const newCart = [...cart];
                            newCart[index].quantity += 1;
                            setCart(newCart);
                          }}
                          aria-label="Increase quantity"
                        >
                          <CiCircleChevUp className="text-3xl text-secondary" />
                        </button>
                      </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden sm:flex flex-col items-end mt-2">
                      {item.labelledPrice > item.price && (
                        <span className="text-secondary/70 line-through text-sm font-semibold">
                          LKR {item.labelledPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-accent text-2xl font-extrabold">
                        LKR {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-secondary/10" />
              </div>
            );
          })}
        </div>

        {/* Customer + Address */}
        {cart.length > 0 && (
          <div className="mt-7 bg-white/60 border border-secondary/10 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Name */}
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-secondary/80"
                >
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full h-12 px-4 rounded-2xl bg-primary/70
                             border border-secondary/10 outline-none
                             focus:border-accent/60 focus:ring-2 focus:ring-accent/20
                             transition"
                />
              </div>

              {/* Address */}
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-secondary/80"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full h-12 px-4 rounded-2xl bg-primary/70
                             border border-secondary/10 outline-none
                             focus:border-accent/60 focus:ring-2 focus:ring-accent/20
                             transition"
                />
              </div>
            </div>

            <p className="text-xs text-secondary/60 mt-3">
              Make sure your address is correct before ordering.
            </p>
          </div>
        )}

        {/* Summary + Order */}
        {cart.length > 0 && (
          <div className="mt-7 bg-accent/10 border border-secondary/10 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="text-center lg:text-left">
              <p className="text-secondary/70 font-semibold">Total Amount</p>
              <p className="text-accent text-3xl sm:text-4xl font-extrabold mt-1">
                LKR {getTotal().toFixed(2)}
              </p>
            </div>

            <button
              onClick={purchaseCart}
              className="w-full lg:w-[280px] h-[56px] bg-accent text-white font-extrabold text-lg rounded-2xl
                         flex justify-center items-center shadow-sm
                         hover:opacity-95 active:scale-[0.99] transition"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
// import { BiTrash } from "react-icons/bi";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function CheckoutPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [address, setAddress] = useState("");
//   const[name,setName]=useState("")

//   const [cart, setCart] = useState(location.state);

//   function getTotal() {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.price * item.quantity;
//     });
//     return total;
//   }

//   async function purchaseCart() {
//     const token = localStorage.getItem("token");
//     if (token == null) {
//       toast.error("Please login to place and order");
//       navigate("/login");
//       return;
//     }
//     try {
//       const items = [];
//       for (let i = 0; i < cart.length; i++) {
//         items.push({
//           productID: cart[i].productID,
//           quantity: cart[i].quantity,
//         });
//       }

//       await axios.post(
//         import.meta.env.VITE_API_URL + "/api/orders",
//         {
//           address: address,
//           customerName: name == ""?null:name,
//           items: items,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       toast.success("Order placed successfully");
//     } catch (error) {
//       toast.error("Failed to place order");
//       console.log(error);

//       if (error.response && error.response.status === 400) {
//         toast.error(error.response.data.message);
//       }
//     }
//   }

//   return (
//     <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-4 py-6 flex justify-center">
//       <div className="w-full max-w-5xl">
//         {/* Title */}
//         <div className="flex items-end justify-between mb-5">
//           <h1 className="text-2xl lg:text-3xl font-bold text-secondary">
//             Checkout
//           </h1>
//           <span className="text-sm lg:text-base text-secondary/70">
//             {cart?.length || 0} item{cart?.length !== 1 ? "s" : ""}
//           </span>
//         </div>

//         {/* Items */}
//         <div className="flex flex-col gap-4">
//           {cart.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
//               >
//                 <div className="flex flex-col sm:flex-row gap-4 p-4">
//                   {/* Image */}
//                   <div className="w-full sm:w-[120px] flex justify-center sm:justify-start">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-[140px] sm:h-[120px] w-full sm:w-[120px] rounded-xl object-cover"
//                     />
//                   </div>

//                   {/* Info */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     {/* Name + Trash */}
//                     <div className="flex justify-between items-start gap-3">
//                       <div className="text-left">
//                         <h2 className="text-lg lg:text-xl font-bold text-secondary leading-snug">
//                           {item.name}
//                         </h2>
//                         <p className="text-secondary/70 font-semibold mt-1">
//                           {item.productID}
//                         </p>
//                       </div>

//                       {/* Keep same click logic (currently empty in your code) */}
//                       <button
//                         className="flex items-center gap-1 text-sm font-semibold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
//                         onClick={() => {
//                           // (left empty intentionally — same as your original)
//                         }}
//                         aria-label="Remove item"
//                       >
//                         <BiTrash className="text-lg" />
//                         <span className="hidden sm:inline">Remove</span>
//                       </button>
//                     </div>

//                     {/* Mobile Price */}
//                     <div className="sm:hidden mt-3 flex flex-col items-center">
//                       {item.labelledPrice > item.price && (
//                         <span className="text-secondary/70 line-through text-sm font-semibold">
//                           LKR {item.labelledPrice.toFixed(2)}
//                         </span>
//                       )}
//                       <span className="text-accent text-2xl font-bold">
//                         LKR {item.price.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Quantity + Desktop Price */}
//                   <div className="w-full sm:w-[260px] flex sm:flex-col sm:items-end justify-between sm:justify-center gap-3">
//                     {/* Quantity Controls */}
//                     <div className="flex items-center justify-center sm:justify-end gap-3 bg-black/10 rounded-xl px-4 py-2">
//                       <CiCircleChevDown
//                         className="text-3xl cursor-pointer hover:scale-110 transition"
//                         onClick={() => {
//                           const newCart = [...cart];
//                           if (newCart[index].quantity > 1) {
//                             newCart[index].quantity -= 1;
//                           }
//                           setCart(newCart);
//                         }}
//                       />

//                       <span className="text-3xl font-bold text-secondary min-w-[40px] text-center">
//                         {item.quantity}
//                       </span>

//                       <CiCircleChevUp
//                         className="text-3xl cursor-pointer hover:scale-110 transition"
//                         onClick={() => {
//                           const newCart = [...cart];
//                           newCart[index].quantity += 1;
//                           setCart(newCart);
//                         }}
//                       />
//                     </div>

//                     {/* Desktop Price */}
//                     <div className="hidden sm:flex flex-col items-end">
//                       {item.labelledPrice > item.price && (
//                         <span className="text-secondary/70 line-through text-sm font-semibold">
//                           LKR {item.labelledPrice.toFixed(2)}
//                         </span>
//                       )}
//                       <span className="text-accent text-2xl font-bold">
//                         LKR {item.price.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="h-[1px] bg-white/10" />
//               </div>
//             );
//           })}
//         </div>

//           <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
//             <div className="w-full text-center lg:text-left">
//               <lable 
//               htmlFor ="name"
//               className="text-secondary/70 font-semibold"
//               >Name:</lable>
//               <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full text-secondary/70 font-semibold border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4"
//             />
//             </div>
            
            
//             <div className="w-full text-center lg:text-left">
//               <lable 
//               htmlFor ="address"
//               className="text-secondary/70 font-semibold"
//               >Shipping Address:</lable>
//               <input
//               type="text"
//               id="address"
//               name="address"
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full text-secondary/70 font-semibold border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4"
//             />
//             </div>
//           </div>

//         {/* Bottom Summary */}
//         {cart.length > 0 && (
//           <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
//             <div className="text-center lg:text-left">
//               <p className="text-secondary/70 font-semibold">Total Amount</p>
//               <p className="text-accent text-3xl font-extrabold">
//                 LKR {getTotal().toFixed(2)}
//               </p>
//             </div>

//             <button
//               onClick={purchaseCart}
//               className="w-full lg:w-[260px] h-[54px] bg-accent text-white font-bold text-xl rounded-xl flex justify-center items-center hover:opacity-90 active:scale-[0.99] transition"
//             >
//               Order
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

// import { BiTrash } from "react-icons/bi";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function CheckoutPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cart, setCart] = useState(location.state);

//   function getTotal() {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.price * item.quantity;
//     });
//     return total;
//   }
//   async function purchaseCart() {
//     const token = localStorage.getItem("token");
//     if(token == null){
//       toast.error("Please login to place and order");
//       navigate("/login")
//       return
//     }
//     try{
//         const items = []
//         for (let i = 0; i < cart.length; i++) {
//           items.push({
//             productID : cart[i].productID,
//             quantity : cart[i].quantity
//           })
//         }


//        await axios.post(import.meta.env.VITE_API_URL+"/api/orders",{
//         address : "No. 66/1a Main street .city",
//         items : items

//       },{
//         headers :{
//           Authorization : "Bearer "+token
//         }
//       })
//     toast.success("Order placed successfully");
//     }catch(error){
//       toast.error("Failed to place order");
//       console.log(error);

//       //error is 400
//       if(error.response && error.response.status === 400){
       
//         toast.error(error.response.data.message);
       
//       }
//     }

//   }

//   return (
//     <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center ">
//       <div className="w-[650px] h-[400px] flex flex-col gap-4">
//         {cart.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="w-full h-[120px]  flex relative items-center"
//             >
//               <button
//                 className="absolute text-red-500 right-[-30px] text-3xl p-[5px] font-bold rounded-full aspect-square hover:bg-red-600 hover:text-white "
//                 onClick={() => {
                  
//                 }}
//               >
//                 <BiTrash />
//               </button>

//               <img
//                 src={item.image}
//                 className="h-full aspect-square object-cover"
//               />
//               <div className="w-[225px] h-full flex flex-col pl-[5px] pt-[10px]">
//                 <h1 className="font-semibold text-lg w-full text-wrap">
//                   {item.name}
//                 </h1>
//                 <span className="font-semibold text-secondary">
//                   {item.productID}
//                 </span>
//               </div>
//               <div className="w-[100px] h-full flex flex-col justify-center items-center ">
//                 <CiCircleChevUp
//                   onClick={() => {
//                     const newCart = [...cart]
//                     newCart[index].quantity += 1;
//                     setCart(newCart);
//                   }}
//                   className="text-3xl"
//                 />
//                 <span className=" font-semibold text-4xl">{item.quantity}</span>

//                 <CiCircleChevDown
//                   className=" text-3xl"
//                   onClick={() => {
//                    const newCart = [...cart]
//                    if (newCart[index].quantity>1) {
//                         newCart[index].quantity -= 1;
//                    }
//                     setCart(newCart);
//                   }}
//                 />
//               </div>
//               <div className="w-[180px]  h-full flex flex-col">
//                 {item.labelledPrice > item.price && (
//                   <span className=" text-secondary/70 w-full text-right line-through text-sm font-semibold mt-[20px] pr-[10px] ">
//                     LKR {item.labelledPrice.toFixed(2)}
//                   </span>
//                 )}
//                 <span className="font-semibold text-accent w-full text-right text-2xl mt-[5px] pr-[10px] ">
//                   LKR {item.price.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//         <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
//           <button
//             to="/checkout"
//             onClick={purchaseCart}
//             className="w-[200px] h-[50px] bg-accent text-white font-semibold text-2xl flex left-0 absolute justify-center items-center"
//           >
//             Order
//           </button>
//           <div className=" h-[50px]">
//             <span className="font-semibold text-accent w-full text-right text-2xl mt-[5px] pr-[10px] ">
//               Total: LKR {getTotal().toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
