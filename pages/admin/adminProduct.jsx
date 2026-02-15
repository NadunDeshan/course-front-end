import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="w-full h-full p-6">
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"
      >
        <CiCirclePlus />
      </Link>
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-primary/40">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Products</h1>
            <p className="text-base text-secondary/70">
              Manage your cosmetic products list
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary/70 border-b border-white/15">
              <tr className="text-base font-semibold text-secondary uppercase">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product ID</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Product Price</th>
                <th className="px-6 py-4">Labeled Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {products.map((item) => (
                <tr
                  key={item.productID}
                  className="hover:bg-white/10 transition text-base"
                >
                  <td className="px-6 py-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden ring-1 ring-white/20">
                      <img
                        src={item.images?.[0]}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                    {item.productID}
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                    Rs. {item.price}
                  </td>

                  <td className="px-6 py-4 text-secondary/70 line-through">
                    Rs. {item.labalPrice}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-4 py-2 rounded-full bg-accent/20 text-secondary font-semibold text-sm">
                      {item.catagory}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-center items-center text-xl">
                      <FaRegTrashAlt className="hover:text-red-600 transition cursor-pointer" />
                      <FaRegEdit className="hover:text-accent transition cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/15 bg-primary/40 text-base text-secondary/80">
          Showing <span className="font-bold">{products.length}</span> products
        </div>
      </div>
    </div>
  );
}

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

// export  default function AdminProductPage(){

//     const[products,setProducts]= useState([]);

//     useEffect( ()=>{
//         axios.get(import.meta.env.VITE_API_URL+"/api/products").then(
//         (response)=>{
//             console.log(response.data);
//             setProducts(response.data);
//         }
//     )
//     } , [])

//     return(
//         <div className="w-full h-full p-[10px]">
//             <table className="border w-full text-center">
//                 <thead>
//                     <tr>
//                         <th>Image</th>
//                         <th>Product ID</th>
//                         <th>Product Name</th>
//                         <th>Product Price</th>
//                         <th>Labled Price</th>
//                         <th>Catogory</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {products.map(
//                     (item)=>{
//                         return(
//                         <tr key={item.productID}>
//                             <td><img src={item.images[0]} className="w-16 h-16 object-cover"/></td>
//                             <td>{item.productID}</td>
//                             <td>{item.name}</td>
//                             <td>{item.price}</td>
//                             <td>{item.labalPrice}</td>
//                             <td>{item.catagory}</td>
//                             <td>
//                                 <div className="flex fles-row gap-[20px] justify-center items-center">
//                                     <FaRegTrashAlt className="hover:text-red-600"/>
//                                     <FaRegEdit className=" hover:text-accent"/>

//                                 </div>
//                             </td>
//                         </tr>
//                         );
//                     })}
//                 </tbody>

//             </table>
//         </div>
//     )
// }
