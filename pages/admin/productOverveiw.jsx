import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../src/components/loader";
import ImageSlider from "../../src/components/imageSlider";
import { addToCart } from "../../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((response) => {
        setProduct(response.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product");
        setStatus("error");
      });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-accent text-secondary">
      {status == "loading" && <Loader />}

      {status == "success" && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* Top Title (mobile) */}
          <h1 className="lg:hidden text-2xl sm:text-3xl font-bold text-center tracking-tight">
            {product.name}
          </h1>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LEFT: Images */}
            <div className="w-full">
              <div className="bg-primary/40 backdrop-blur rounded-3xl border border-secondary/10 shadow-sm p-4 sm:p-6">
                <ImageSlider images={product.images} />
              </div>
            </div>

            {/* RIGHT: Product info */}
            <div className="w-full">
              <div className="bg-primary rounded-3xl border border-secondary/10 shadow-sm p-6 sm:p-8 lg:p-10">
                {/* ID + Category row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                    {product.productID}
                  </span>

                  <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-accent/15 text-secondary">
                    Category: {product.catagory}
                  </span>
                </div>

                {/* Title (desktop) */}
                <h1 className="hidden lg:block mt-5 text-3xl font-bold tracking-tight">
                  {product.name}
                </h1>

                {/* Alt names */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.altName || []).map((name, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm px-3 py-1 rounded-full border border-secondary/15 bg-white/50"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-6 text-sm sm:text-base leading-7 text-secondary/90 text-justify">
                  {product.description}
                </p>

                {/* Price box */}
                <div className="mt-7 p-4 sm:p-5 rounded-2xl bg-accent/10 border border-accent/20">
                  {product.labelledPrice > product.price ? (
                    <div className="flex items-end gap-3 flex-wrap">
                      <p className="text-sm sm:text-base line-through text-secondary/70">
                        LKR {product.labelledPrice.toFixed(2)}
                      </p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-accent">
                        LKR {product.price.toFixed(2)}
                      </p>
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-600">
                        SALE
                      </span>
                    </div>
                  ) : (
                    <p className="text-2xl sm:text-3xl font-extrabold text-accent">
                      LKR {product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    className="h-12 rounded-xl bg-accent text-white font-semibold
                               hover:bg-white hover:text-accent border border-accent
                               transition-all duration-200 shadow-sm"
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success(" added to cart successfully");
                    }}
                  >
                    Add to cart
                  </button>

                  <Link
                    to="/checkout"
                    state={[
                      {
                        image: product.images[0],
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        quantity: 1,
                      },
                    ]}
                    className="h-12 rounded-xl bg-red-600 text-white font-semibold
                               hover:bg-white hover:text-red-600 border border-red-600
                               transition-all duration-200 shadow-sm flex justify-center items-center"
                  >
                    Buy Now
                  </Link>
                </div>

                {/* Extra small note */}
                <p className="mt-5 text-xs text-secondary/60">
                  Tip: Add to cart if you want to continue shopping.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {status == "error" && (
        <div className="w-full max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-red-500 text-xl font-semibold text-center">
            Product detail load failed
          </h1>
        </div>
      )}
    </div>
  );
}


// import axios from "axios";
// import {useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";
// import { Loader } from "../../src/components/loader";
// import ImageSlider from "../../src/components/imageSlider";
// import { addToCart, loadCart } from "../../utils/cart";

// export default function ProductOverview(){

//     const params = useParams();
//     //loading,success,error
//     const [status, setStatus] = useState("loading"); //useState("loading");
//     const [product, setProduct] = useState(null);


//     useEffect(() => {
//         axios.get(import.meta.env.VITE_API_URL+"/api/products/"+params.id)
//         .then(
//             (response)=>{
//                 setProduct(response.data)
//                 setStatus("success");
//             }
//         ).catch(
//             ()=>{
//                 toast.error("Failed to fetch product")
//                 setStatus("error");
//             }
//         )
        
//     }, [])

//     return (
//         <div className="w-full lg:h-[calc(100vh-100px)] text-secondary bg-accent"> 
//             {
//                 status == "loading" && <Loader/>
//             }
//             {
//                 status == "success" && (
//                     <div className="w-full h-full flex flex-col lg:flex-row p-10 ">
//                         <h1 className=" lg:hidden text-2xl font-bold text-center">{product.name}</h1>
//                         <div className=" w-full lg:w-[50%] flex justify-center items-center">
//                             <ImageSlider images={product.images}/>  
//                         </div>
//                         <div className="bg-primary lg:w-[50%] border border-secondary w-full h-full flex flex-col items-center gap-4 p-10 ">
//                             <span>{product.productID}</span>
//                             <h1 className="  text-2xl font-bold text-center">{product.name}
//                                 {
//                                     (product.altName || []).map(
//                                         (name, index) => {
//                                             return(
//                                                 <span key={index} className=" font-normal text-secondary">{" | " + name}</span>
//                                             )
//                                         }
//                                     )
//                                 }
//                             </h1>
//                             <p className="mt-[30px] text-justify">{product.description}</p>
//                             <p>Category : {product.catagory}</p>
//                             {
//                                 product.labelledPrice>product.price?
//                                 <div className="flex gap-3 items-center">
//                                     <p className="text-lg text-secondary font-normal text-sm line-through">LKR{product.labelledPrice.toFixed(2)}</p>
//                                     <p className="text-lg text-accent font-bold">LKR {product.price.toFixed(2)}</p>
//                                     </div>:
//                                 <span className="text-accent">LKR {product.price.toFixed(2)}</span>
//                             }
//                             <div className="w-full h-[40px] flex gap-4 mt-[60px]">
//                                 <button className="w-full h-full bg-accent text-white hover:bg-white hover:text-accent border border-accent"
//                                 onClick={()=>{
//                                     addToCart(product,1)
//                                     toast.success(" added to cart successfully")
//                                 }

//                                 }>Add to cart</button>
//                                 <Link to="/checkout" state={[{
//                                     image:product.images[0],
//                                     productID:product.productID,
//                                     name:product.name,
//                                     price:product.price,
//                                     labelledPrice:product.labelledPrice,
//                                     quantity:1
//                                 }]}className="w-full h-full bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600 flex justify-center items-center"
//                                 >Buy Now</Link>

//                             </div>

//                         </div>
//                     </div>
//                 )
//             }
//             {
//                 status == "error" && <h1 className="text-red-500">Product detail load failed</h1>
//             }
//         </div>
//     )
// }