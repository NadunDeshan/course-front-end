
export default function TestPage() {
  return <div className="w-full h-full flex flex-col">

      <div className="h-[100px] bg-black">Header</div>

      <div className="w-full min-h-[calc(100vh-100px)] bg-purple-300">
      Content area
      </div>
      </div>
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
