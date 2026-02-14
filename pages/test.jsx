import { useState } from "react";

export default function TestPage(){

    const [c,d]=useState(150)

    console.log(c);
    let count = 10;


    return(
        <div className="w-full h-full flex justify-center items-center ">
            <div className="w-[500px] h-[500px] bg-amber-200 text-white flex justify-center items-center gap-4">
                <button onClick={
                    ()=>{
                        console.log("Decreasing...");
                        count=count-1
                        console.log(count);
                    }
                } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    -
                </button>
                <span className="text-accent text-5xl">
                    {count}
                </span>
                <button onClick={
                    ()=>{
                        console.log("Adding...");
                        count=count+1
                        console.log(count);
                    } 
                }className="w-[100px] bg-accent h-[40px] rounded-lg">
                    +
                </button>
            </div>
        </div>
    )
}