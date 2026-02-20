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
  const[name,setName]=useState("")

  const [cart, setCart] = useState(location.state);

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
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
          customerName: name == ""?null:name,
          items: items,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order");
      console.log(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-4 py-6 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="flex items-end justify-between mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold text-secondary">
            Checkout
          </h1>
          <span className="text-sm lg:text-base text-secondary/70">
            {cart?.length || 0} item{cart?.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image */}
                  <div className="w-full sm:w-[120px] flex justify-center sm:justify-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[140px] sm:h-[120px] w-full sm:w-[120px] rounded-xl object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Name + Trash */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="text-left">
                        <h2 className="text-lg lg:text-xl font-bold text-secondary leading-snug">
                          {item.name}
                        </h2>
                        <p className="text-secondary/70 font-semibold mt-1">
                          {item.productID}
                        </p>
                      </div>

                      {/* Keep same click logic (currently empty in your code) */}
                      <button
                        className="flex items-center gap-1 text-sm font-semibold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                        onClick={() => {
                          // (left empty intentionally — same as your original)
                        }}
                        aria-label="Remove item"
                      >
                        <BiTrash className="text-lg" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>

                    {/* Mobile Price */}
                    <div className="sm:hidden mt-3 flex flex-col items-center">
                      {item.labelledPrice > item.price && (
                        <span className="text-secondary/70 line-through text-sm font-semibold">
                          LKR {item.labelledPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-accent text-2xl font-bold">
                        LKR {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity + Desktop Price */}
                  <div className="w-full sm:w-[260px] flex sm:flex-col sm:items-end justify-between sm:justify-center gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-end gap-3 bg-black/10 rounded-xl px-4 py-2">
                      <CiCircleChevDown
                        className="text-3xl cursor-pointer hover:scale-110 transition"
                        onClick={() => {
                          const newCart = [...cart];
                          if (newCart[index].quantity > 1) {
                            newCart[index].quantity -= 1;
                          }
                          setCart(newCart);
                        }}
                      />

                      <span className="text-3xl font-bold text-secondary min-w-[40px] text-center">
                        {item.quantity}
                      </span>

                      <CiCircleChevUp
                        className="text-3xl cursor-pointer hover:scale-110 transition"
                        onClick={() => {
                          const newCart = [...cart];
                          newCart[index].quantity += 1;
                          setCart(newCart);
                        }}
                      />
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden sm:flex flex-col items-end">
                      {item.labelledPrice > item.price && (
                        <span className="text-secondary/70 line-through text-sm font-semibold">
                          LKR {item.labelledPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-accent text-2xl font-bold">
                        LKR {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10" />
              </div>
            );
          })}
        </div>

          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="w-full text-center lg:text-left">
              <lable 
              htmlFor ="name"
              className="text-secondary/70 font-semibold"
              >Name:</lable>
              <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-secondary/70 font-semibold border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4"
            />
            </div>
            
            
            <div className="w-full text-center lg:text-left">
              <lable 
              htmlFor ="address"
              className="text-secondary/70 font-semibold"
              >Shipping Address:</lable>
              <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-secondary/70 font-semibold border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4"
            />
            </div>
          </div>

        {/* Bottom Summary */}
        {cart.length > 0 && (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="text-secondary/70 font-semibold">Total Amount</p>
              <p className="text-accent text-3xl font-extrabold">
                LKR {getTotal().toFixed(2)}
              </p>
            </div>

            <button
              onClick={purchaseCart}
              className="w-full lg:w-[260px] h-[54px] bg-accent text-white font-bold text-xl rounded-xl flex justify-center items-center hover:opacity-90 active:scale-[0.99] transition"
            >
              Order
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
