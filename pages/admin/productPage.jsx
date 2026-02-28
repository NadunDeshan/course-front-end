import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../../src/components/loader,";
import axios from "axios";
import ProductCard from "../../src/components/productCard";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoding(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoding(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
  <div className="w-full min-h-[calc(100vh-100px)] bg-purple-300">
    {/* Search Bar */}
    <div className="mt-3 flex justify-center">
      <div className="w-full max-w-3xl rounded-3xl bg-white border border-secondary/10 shadow-lg px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1 rounded-2xl px-4 py-3 bg-primary border border-secondary/10">
            <span className="text-secondary/70 text-lg">🔎</span>

            <input
              id="product-search-input"
              type="text"
              placeholder="Search products by name..."
              className="flex-1 bg-transparent outline-none text-secondary placeholder:text-secondary/45"
              onChange={(e) => {
                const value = e.target.value;

                if (window.__productSearchTimer)
                  clearTimeout(window.__productSearchTimer);

                window.__productSearchTimer = setTimeout(async () => {
                  try {
                    if (value.trim() === "") {
                      setIsLoding(true);
                      return;
                    }

                    setIsLoding(true);
                    const searchResult = await axios.get(
                      import.meta.env.VITE_API_URL +
                        "/api/products/search/" +
                        encodeURIComponent(value.trim())
                    );

                    setProducts(searchResult.data);
                    setIsLoding(false);
                  } catch (err) {
                    console.error("Search error:", err.response?.data || err.message);
                    setIsLoding(false);
                    toast.error("Failed to search products");
                  }
                }, 400);
              }}
            />
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                const input = document.querySelector("#product-search-input");
                if (input) input.value = "";
                setIsLoding(true);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-secondary font-semibold
              border border-secondary/15 hover:bg-primary transition active:scale-95"
            >
              Clear
            </button>

            <button
              type="button"
              className="px-5 py-3 rounded-2xl bg-accent text-white font-bold
              shadow-md shadow-accent/20 hover:brightness-110 transition active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        <p className="mt-3 text-sm text-secondary/55">
          Example: “cream”, “serum”, “lipstick”, “sunscreen”
        </p>
      </div>
    </div>

    {/* TOP AREA */}
    <div className="w-full bg-yellow-400 border-b border-secondary/10">
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-2xl font-extrabold text-secondary">
              Products
            </h1>
            <p className="text-secondary/60 mt-1">
              Find what you need — search by product name.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-secondary/10 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
            <span className="text-sm font-semibold text-secondary/80">
              {isLoading ? "Loading..." : `${products.length} items`}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* PRODUCTS */}
    {isLoading ? (
      <div className="w-full flex justify-center items-center py-16">
        <Loader />
      </div>
    ) : (
      <div className="w-full bg-pink-300 flex">
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-10 bg-amber-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((item) => (
              <ProductCard key={item.productID} product={item} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="w-full flex justify-center py-16">
              <div className="rounded-3xl bg-white border border-secondary/10 shadow-lg px-8 py-8 text-center">
                <p className="text-xl font-extrabold text-secondary">
                  No products found
                </p>
                <p className="text-secondary/60 mt-2">
                  Try a different keyword or press “Clear”.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

  // return (
  //   <div className="w-full min-h-[calc(100vh-100px)]  bg-purple-300">
  //     {/* TOP AREA */}
  //     <div className="w-full bg-yellow-400 border-b border-secondary/10">
  //       <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-8">
  //         {/* Title + small info */}
  //         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
  //           <div>
  //             <h1 className="text-2xl lg:text-2xl font-extrabold text-secondary">
  //               Products
  //             </h1>
  //             <p className="text-secondary/60 mt-1">
  //               Find what you need — search by product name.
  //             </p>
  //           </div>

  //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-secondary/10 shadow-sm">
  //             <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
  //             <span className="text-sm font-semibold text-secondary/80">
  //               {isLoading ? "Loading..." : `${products.length} items`}
  //             </span>
  //           </div>
  //         </div>



  //     {/* PRODUCTS */}
  //     {isLoading ? (
  //       <div className="w-full flex justify-center items-center py-16">
  //         <Loader />
  //       </div>
  //     ) : (
  //       <div className="w-full bg-pink-300 flex  ">
  //         <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-10 bg-amber-300 ">
  //           {/* ✅ More professional layout + big gaps */}
  //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-60">
  //             {products.map((item) => {
  //               return <ProductCard key={item.productID} product={item} />;
  //             })}
  //           </div>

  //           {/* Empty state (UI only) */}
  //           {products.length === 0 && (
  //             <div className="w-full flex justify-center py-16">
  //               <div className="rounded-3xl bg-white border border-secondary/10 shadow-lg px-8 py-8 text-center">
  //                 <p className="text-xl font-extrabold text-secondary">
  //                   No products found
  //                 </p>
  //                 <p className="text-secondary/60 mt-2">
  //                   Try a different keyword or press “Clear”.
  //                 </p>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </div>

  
}
export default ProductPage; 

 
//before new css

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Loader } from "../../src/components/loader,";
// import axios from "axios";
// import ProductCard from "../../src/components/productCard";

// export function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoding] = useState(true);

//   useEffect(() => {
//     if (isLoading) {
//       axios
//         .get(import.meta.env.VITE_API_URL + "/api/products")
//         .then((response) => {
//           setProducts(response.data);
//           setIsLoding(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching products:", error);
//           setIsLoding(false);
//           toast.error("Failed to load products");
//         });
//     }
//   }, [isLoading]);

//   return (
//     <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
//       <div className="w-full h-[100px] flex justify-center items-center px-4 bg-primary">
//         <div className="w-full max-w-2xl flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl px-4 py-3">
//           <span className="text-secondary/70 text-lg">🔎</span>

//           <input
//             type="text"
//             placeholder="Search products by name..."
//             className="flex-1 bg-transparent outline-none text-secondary placeholder:text-secondary/50"
//             onChange={(e) => {
//               const value = e.target.value;

//               // ✅ debounce: wait 400ms after typing
//               if (window.__productSearchTimer)
//                 clearTimeout(window.__productSearchTimer);

//               window.__productSearchTimer = setTimeout(async () => {
//                 try {
//                   // ✅ empty -> reload all products using your existing logic
//                   if (value.trim() === "") {
//                     setIsLoding(true); // triggers your useEffect fetch
//                     return;
//                   }

//                   setIsLoding(true);
//                   const searchResult = await axios.get(
//                     import.meta.env.VITE_API_URL +
//                       "/api/products/search/" +
//                       encodeURIComponent(value.trim()),
//                   );

//                   setProducts(searchResult.data);
//                   setIsLoding(false);
//                 } catch (err) {
//                   console.error(
//                     "Search error:",
//                     err.response?.data || err.message,
//                   );
//                   setIsLoding(false);
//                   toast.error("Failed to search products");
//                 }
//               }, 400);
//             }}
//           />

//           <button
//             type="button"
//             onClick={() => {
//               // clear input + reload all products
//               const input = document.querySelector("#product-search-input");
//               if (input) input.value = "";
//               setIsLoding(true);
//             }}
//             className="px-3 py-2 rounded-xl bg-white/60 text-secondary hover:bg-white transition"
//           >
//             Clear
//           </button>

//           <button
//             type="button"
//             className="px-4 py-2 rounded-xl bg-accent text-white font-semibold hover:brightness-110 transition"
//             onClick={() => {
//               // optional: user can click search but debounce already does
//               // keeping button for UX only
//             }}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       {/* <div className="w-full h-[100px] bg-purple-300 flex flex-row justify-center items-center">
//                 <input 
//                 onChange={async (e)=>{
//                     try{
//                     if(e.target.value ==""){
//                         setIsLoding(true);
//                     }else{
//                         const searchResult = await axios.get(import.meta.env.VITE_API_URL+"/api/products/search/"+e.target.value);
//                         setProducts(searchResult.data);
//                         setIsLoding(false);

//                     }
//                     }catch{
//                         toast.error("Failed to search products");
//                 }
//                 }}
//                 type="text" placeholder="Search for products" className="w-[50%] h-[50px] p-2 rounded-full"/>
//             </div> */}

//       {/* Basic Product Page */}
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="w-full h-full flex flex-row flex-wrap justify-center items-center bg-primary">
//           {products.map((item) => {
//             return <ProductCard key={item.productID} product={item} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
// export default ProductPage;
