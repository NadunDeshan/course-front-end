
export default function TestPage() {
  return <div className="w-full h-full flex flex-col">

       {/* Search Bar */}
                    <div className="mt-0 flex">
                      <div className="w-full max-w-6xl rounded-3xl bg-white border border-secondary/10 shadow-lg px-4 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex gap-3 flex-1 rounded-2xl px-25 py-1 bg-primary border border-secondary/10">
                            <span className="text-secondary/70 text-lg">🔎</span>
              
                            <input
                              id="product-search-input"
                              type="text"
                              placeholder="Search products by name..."
                              className="flex-1 bg-transparent outline-none text-left text-secondary placeholder:text-secondary/45"
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
                                        encodeURIComponent(value.trim()),
                                    );
              
                                    setProducts(searchResult.data);
                                    setIsLoding(false);
                                  } catch (err) {
                                    console.error(
                                      "Search error:",
                                      err.response?.data || err.message,
                                    );
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
                              className="px-4 py-1 rounded-2xl bg-white text-secondary font-semibold
                            border border-secondary/15 hover:bg-primary transition active:scale-95"
                            >
                              Clear
                            </button>
              
                            <button
                              type="button"
                              className="px-4 py-1 rounded-2xl bg-accent text-white font-bold
                            shadow-md shadow-accent/20 hover:brightness-110 transition active:scale-95"
                            >
                              Search
                            </button>
                          </div>
                        </div>
      </div>
  </div>
  </div>;
}


  
  //   const[file,setFile]= useState(null)

  //       async function uploadimage(){
  //           const link = await mediaUpload(file)
  //           console.log(link)
  //       }
  
  //   return (
  //   <div className="w-full h-full flex justify-center items-center">
  //     <input type="file" onChange={
  //       (e)=>{
  //           setFile(e.target.files[0])
  //       }
  //     }/>
  //     <button className="bg-blue-500 text-white p-2 rounded" onClick={uploadimage}>
  //       Upload
  //     </button>
  //   </div>
  // );


// const [c,d]=useState(150)

// console.log(c);
// let count = 10;

// return(
//     <div className="w-full h-full flex justify-center items-center ">
//         <div className="w-[500px] h-[500px] bg-amber-200 text-white flex justify-center items-center gap-4">
//             <button onClick={
//                 ()=>{
//                     console.log("Decreasing...");
//                     count=count-1
//                     console.log(count);
//                 }
//             } className="w-[100px] bg-accent h-[40px] rounded-lg">
//                 -
//             </button>
//             <span className="text-accent text-5xl">
//                 {count}
//             </span>
//             <button onClick={
//                 ()=>{
//                     console.log("Adding...");
//                     count=count+1
//                     console.log(count);
//                 }
//             }className="w-[100px] bg-accent h-[40px] rounded-lg">
//                 +
//             </button>
//         </div>
//     </div>
// )
