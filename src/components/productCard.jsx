import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product= props.product;
    return(
        <div className="w-[300px] h-full rounded-2xl bg-background hadow-md overflow-hidden 
            hover:shadow-2xl hover:-translate-y-2 
            transition duration-300 cursor-pointer group shadow-2xl m-3 flex flex-col p-[10px]">
            <img  className="w-full h-[250px] border border-bodr object-cover"src={product.images[0]}/>
            <h1 className="text-xl font-bold text-accent">{product.name}</h1>
            {
                product.labelledPrice>product.price?
                <div className="flex gap-3 items-center">
                    <p className="text-lg text-black font-bold">LKR {product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-400 font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
                    
                </div>:
                <p className="text-lg text-accent font-semibold">LKR. {product.price.toFixed(2)}</p>
            }
            <p className="text-sm text-secondary/70">{product.productID}</p>
            <p className="text-sm text-secondary/70">{product.catagory}</p>
            <Link to={"/overview/"+product.productID} className="w-full  text-center h-[30px] mt-[5px] border border-accent text-accent hover:bg-accent hover:text-white">
                View Products
            </Link>
            
            
        
        </div>
    )

}