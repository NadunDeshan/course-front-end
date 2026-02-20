import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-4 py-6 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Page Title */}
        <div className="flex items-end justify-between mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold text-secondary">
            Your Cart
          </h1>
          <span className="text-sm lg:text-base text-secondary/70">
            {cart.length} item{cart.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Empty State */}
        {cart.length === 0 && (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-secondary text-lg font-semibold">
              Your cart is empty 🛒
            </p>
            <p className="text-secondary/70 mt-1">
              Add some products to continue.
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="relative w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                {/* Info */}
<div className="flex-1 flex flex-col justify-between">
  
  {/* Product Title + Trash */}
  <div className="flex justify-between items-start gap-3">
    
    <div className="text-left">
      <h2 className="text-lg lg:text-xl font-bold text-secondary leading-snug">
        {item.name}
      </h2>
      <p className="text-secondary/70 font-semibold mt-1">
        {item.productID}
      </p>
    </div>

    {/* New Styled Trash Button */}
    <button
      onClick={() => {
        addToCart(item, -item.quantity);
        setCart(loadCart());
      }}
      aria-label="Remove item"
      className="flex items-center gap-1 text-sm font-semibold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
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

                {/* Layout */}
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
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg lg:text-xl font-bold text-secondary leading-snug">
                        {item.name}
                      </h2>
                      <p className="text-secondary/70 font-semibold mt-1">
                        {item.productID}
                      </p>
                    </div>

                    {/* Mobile Price Row */}
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
                          addToCart(item, -1);
                          setCart(loadCart());
                        }}
                      />

                      <span className="text-3xl font-bold text-secondary min-w-[40px] text-center">
                        {item.quantity}
                      </span>

                      <CiCircleChevUp
                        className="text-3xl cursor-pointer hover:scale-110 transition"
                        onClick={() => {
                          addToCart(item, 1);
                          setCart(loadCart());
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

                {/* Optional: small footer line for style */}
                <div className="h-[1px] bg-white/10" />
              </div>
            );
          })}
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

            <Link
              state={cart}
              to="/checkout"
              className="w-full lg:w-[260px] h-[54px] bg-accent text-white font-bold text-xl rounded-xl flex justify-center items-center hover:opacity-90 active:scale-[0.99] transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}





// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
// import { addToCart, getTotal, loadCart } from "../../utils/cart";
// import { BiTrash } from "react-icons/bi";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CartPage() {
//   const [cart,setCart]= useState(loadCart());

//   return (
//     <div className=" bg-primary w-full lg:h-[calc(100vh-100px)]  flex flex-col pt-[25px] items-center ">
//       <div className=" w-[300px] lg: w-[650px]  flex flex-col gap-4 ">
//         {cart.map((item, index) => {
//           return (
//             <div key={index} className="w-full h-[300px] lg:h-[120px]  flex flex-col lg:flex-rowrelative items-center">
//             <button className="absolute text-red-500 right-[-30px] text-3xl p-[5px] font-bold rounded-full aspect-square hover:bg-red-600 hover:text-white " onClick={
//                 () => {
//                     addToCart(item,-item.quantity)
//                     setCart(loadCart())
//                 }}><BiTrash /></button>

//              <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover" /> 
//              <div className="w-full text-center lg:w-[225px] h-[100px]lg:h-full flex flex-col pl-[5px] pt-[10px]">
//                 <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
//                 <span className="font-semibold text-secondary">{item.productID}</span>
//             </div>  
//             <div className="w-[100px] h-full flex flex-row lg:flex-col justify-center items-center ">
//                 <CiCircleChevUp onClick={
//                     ()=>{
//                         addToCart(item,1)
//                         setCart(loadCart())
//                     }
//                 } className="text-3xl" />
//                 <span className=" font-semibold text-4xl">{item.quantity}</span>

//                 <CiCircleChevDown className=" text-3xl"
//                 onClick={() => {
//                     addToCart(item, -1)
//                     setCart(loadCart())
//                     }} />

//             </div>
//             <div className="w-full lg:w-[180px]  h-full flex flex-col">
//                 {
//                     item.labelledPrice>item.price&&
//                     <span className=" text-secondary/70 lg:w-full text-center lg:text-right line-through text-sm font-semibold mt-[20px] pr-[10px] ">LKR {item.labelledPrice.toFixed(2)}</span>
//                 }
//                     <span className="font-semibold text-accent w-full text-center lg:text-right text-2xl mt-[5px] pr-[10px] ">LKR {item.price.toFixed(2)}</span>

                
                    
                    

//             </div>

//             </div>
//           );
//         })}
//         <div className="lg:w-full h-[120px] flex flex-col-reverse lg:flex-row justify-end items-center relative">
//             <Link state={cart} to="/checkout" className="w-[200px] h-[50px] bg-accent text-white font-semibold text-2xl flex left-0 lg:absolute justify-center items-center">Checkout</Link>

//             <div className=" h-[50px] flex ">
//                 <span className="font-semibold text-accent w-full lg:text-right text-2xl mt-[5px] pr-[10px] ">Total: LKR {getTotal().toFixed(2)}</span>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }
