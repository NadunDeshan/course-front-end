import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
    if(token == null){
      toast.error("Please login to place and order");
      navigate("/login")
      return
    }
    try{
        const items = []
        for (let i = 0; i < cart.length; i++) {
          items.push({
            productID : cart[i].productID,
            quantity : cart[i].quantity
          })
        }


       await axios.post(import.meta.env.VITE_API_URL+"/api/orders",{
        address : "No. 66/1a Main street .city",
        items : items

      },{
        headers :{
          Authorization : "Bearer "+token
        }
      })
    toast.success("Order placed successfully");
    }catch(error){
      toast.error("Failed to place order");
      console.log(error);

      //error is 400
      if(error.response && error.response.status === 400){
       
        toast.error(error.response.data.message);
       
      }
    }

  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center ">
      <div className="w-[650px] h-[400px] flex flex-col gap-4">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[120px]  flex relative items-center"
            >
              <button
                className="absolute text-red-500 right-[-30px] text-3xl p-[5px] font-bold rounded-full aspect-square hover:bg-red-600 hover:text-white "
                onClick={() => {
                  
                }}
              >
                <BiTrash />
              </button>

              <img
                src={item.image}
                className="h-full aspect-square object-cover"
              />
              <div className="w-[225px] h-full flex flex-col pl-[5px] pt-[10px]">
                <h1 className="font-semibold text-lg w-full text-wrap">
                  {item.name}
                </h1>
                <span className="font-semibold text-secondary">
                  {item.productID}
                </span>
              </div>
              <div className="w-[100px] h-full flex flex-col justify-center items-center ">
                <CiCircleChevUp
                  onClick={() => {
                    const newCart = [...cart]
                    newCart[index].quantity += 1;
                    setCart(newCart);
                  }}
                  className="text-3xl"
                />
                <span className=" font-semibold text-4xl">{item.quantity}</span>

                <CiCircleChevDown
                  className=" text-3xl"
                  onClick={() => {
                   const newCart = [...cart]
                   if (newCart[index].quantity>1) {
                        newCart[index].quantity -= 1;
                   }
                    setCart(newCart);
                  }}
                />
              </div>
              <div className="w-[180px]  h-full flex flex-col">
                {item.labelledPrice > item.price && (
                  <span className=" text-secondary/70 w-full text-right line-through text-sm font-semibold mt-[20px] pr-[10px] ">
                    LKR {item.labelledPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-semibold text-accent w-full text-right text-2xl mt-[5px] pr-[10px] ">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
          <button
            to="/checkout"
            onClick={purchaseCart}
            className="w-[200px] h-[50px] bg-accent text-white font-semibold text-2xl flex left-0 absolute justify-center items-center"
          >
            Order
          </button>
          <div className=" h-[50px]">
            <span className="font-semibold text-accent w-full text-right text-2xl mt-[5px] pr-[10px] ">
              Total: LKR {getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
