import axios from "axios";
import {useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../src/components/loader,";
import ImageSlider from "../../src/components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";

export default function ProductOverview(){

    const params = useParams();
    //loading,success,error
    const [status, setStatus] = useState("loading"); //useState("loading");
    const [product, setProduct] = useState(null);


    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL+"/api/products/"+params.id)
        .then(
            (response)=>{
                setProduct(response.data)
                setStatus("success");
            }
        ).catch(
            ()=>{
                toast.error("Failed to fetch product")
                setStatus("error");
            }
        )
        
    }, [])

    return (
        <div className="w-full lg:h-[calc(100vh-100px)] text-secondary bg-primary"> 
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && (
                    <div className="w-full h-full flex flex-col lg:flex-row p-10 ">
                        <h1 className=" lg:hidden text-2xl font-bold text-center">{product.name}</h1>
                        <div className=" w-full lg:w-[50%] flex justify-center items-center">
                            <ImageSlider images={product.images}/>  
                        </div>
                        <div className="bg-primary lg:w-[50%]  w-full h-full flex flex-col items-center gap-4 p-10 ">
                            <span>{product.productID}</span>
                            <h1 className="  text-2xl font-bold text-center">{product.name}
                                {
                                    (product.altName || []).map(
                                        (name, index) => {
                                            return(
                                                <span key={index} className=" font-normal text-secondary">{" | " + name}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            <p className="mt-[30px] text-justify">{product.description}</p>
                            <p>Category : {product.catagory}</p>
                            {
                                product.labelledPrice>product.price?
                                <div className="flex gap-3 items-center">
                                    <p className="text-lg text-secondary font-semibold line-through">LKR{product.labelledPrice.toFixed(2)}</p>
                                    <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                                    </div>:
                                <span className="text-accent">LKR {product.price.toFixed(2)}</span>
                            }
                            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                                <button className="w-full h-full bg-accent text-white hover:bg-white hover:text-accent border border-accent"
                                onClick={()=>{
                                    addToCart(product,1)
                                    toast.success(" added to cart successfully")
                                }

                                }>Add to cart</button>
                                <Link to="/checkout" state={[{
                                    image:product.images[0],
                                    productID:product.productID,
                                    name:product.name,
                                    price:product.price,
                                    labelledPrice:product.labelledPrice,
                                    quantity:1
                                }]}className="w-full h-full bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600 flex justify-center items-center"
                                >Buy Now</Link>

                            </div>

                        </div>
                    </div>
                )
            }
            {
                status == "error" && <h1 className="text-red-500">Product detail load failed</h1>
            }
        </div>
    )
}