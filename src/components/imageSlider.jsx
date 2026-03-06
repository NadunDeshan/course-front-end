import { useState } from "react";

export default function ImageSlider(props) {

    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full max-w-[500px] mx-auto">

            {/* Main Image */}
            <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-md border border-secondary/10 bg-white">
                <img
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    src={images[activeImage]}
                />
            </div>

            {/* Thumbnail Images */}
            <div className="w-full flex justify-center items-center gap-3 mt-5 flex-wrap">

                {
                    images.map((imag, index) => {
                        return (
                            <img
                                onClick={() => {
                                    setActiveImage(index)
                                }}
                                key={index}
                                src={imag}
                                className={
                                    "w-[75px] h-[75px] object-cover rounded-lg cursor-pointer border transition-all duration-200 " +
                                    (activeImage == index
                                        ? "border-accent scale-105 shadow-md"
                                        : "border-secondary/20 hover:scale-105 hover:border-accent")
                                }
                            />
                        )
                    })
                }

            </div>

        </div>
    )
}



// import { useState } from "react";

// export default function ImageSlider(props){

//      const images = props.images;
//      const [activeImage, setActiveImage] = useState(0);

//     return(
//     <div className="w-[400px]">
//         <img  className="w-full h-[425px] object-cover "src={images[activeImage]} />

//         <div className="w-full h-[100px] flex justify-center items-center gap-3">
//             {
//             images.map(
//                 (imag, index) => {
//                     return(
//                         <img  onClick={() => {
//                             setActiveImage(index)
//                     }} key={index} className={"w-[90px] h-[90px] object-cover"+ (activeImage == index && " border-4 border-accent")} src={imag} />
//                     )
//                 }
//             )
//             }
//         </div>
                
        
//     </div>
//     )
// }