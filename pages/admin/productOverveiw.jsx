import axios from "axios";
import {useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Loader } from "../../src/components/loader,";
import ImageSlider from "../../src/components/imageSlider";

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
        <div className="w-full h-[calc(100vh-100px)] text-secondary"> 
            {
                status == "loading" && <Loader/>
            }
            {
                status == "success" && (
                    <div className="w-full h-full flex">
                        <div className="w-[50%] h-full flex justify-center items-center">
                            <ImageSlider images={product.images}/>  
                        </div>
                        <div className="w-[50%] h-full flex flex-col items-center gap-4 p-10 ">
                            <span>{product.productID}</span>
                            <h1 className="text-2xl font-bold text-center">{product.name}
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
                                <button className="w-full h-full bg-accent text-white hover:bg-white hover:text-accent border border-accent">Add to cart</button>
                                <button className="w-full h-full bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600">Delete Product</button>

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