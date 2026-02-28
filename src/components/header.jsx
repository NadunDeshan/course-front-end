import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import UserData from "./userData";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-primary border-b border-secondary/15 sticky top-0 z-50">
      <div className="w-full max-w-6xl mx-auto h-[84px] lg:h-[104px] px-4 lg:px-10 flex items-center justify-between">

        {/* LEFT SIDE: logo (top-left) + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-[46px] h-[46px] rounded-2xl
            bg-white/70 border border-secondary/15
            hover:bg-white transition active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <HiOutlineX className="text-2xl text-secondary" />
            ) : (
              <HiOutlineMenuAlt3 className="text-2xl text-secondary" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-[64px] lg:h-[84px] w-[150px] lg:w-[200px] object-contain"
            />
          </Link>
        </div>
                  
        {/* CENTER: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <Link
            className="px-4 py-2 rounded-xl font-semibold text-secondary hover:bg-white/70 transition"
            to="/"
          >
            Home
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-semibold text-secondary hover:bg-white/70 transition"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-semibold text-secondary hover:bg-white/70 transition"
            to="/about"
          >
            About
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-semibold text-secondary hover:bg-white/70 transition"
            to="/contact"
          >
            Contact
          </Link>
        </nav>

        {/* RIGHT SIDE: User/Login + Cart (top-right) */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* User / Login */}
          <div className="flex items-center">
            <UserData />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-[46px] h-[46px] rounded-2xl
            bg-accent text-white shadow-md hover:brightness-110 transition active:scale-95"
            onClick={() => setOpen(false)}
            aria-label="Cart"
          >
            <BsCart3 className="text-2xl" />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden px-4 pb-4">
          <div className="bg-white border border-secondary/15 rounded-2xl overflow-hidden shadow-sm">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}




//before  new tailwind css
//--------------------------------------------------------------------------------------------------------------
// import { BsCart3 } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import UserData from "./userData";

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="w-full bg-accent text-white">
//       <div className="w-full max-w-6xl mx-auto h-[80px] lg:h-[100px] px-4 lg:px-10 flex items-center justify-between">

//         {/* LEFT SIDE */}
//         <div className="flex items-center gap-3">

//           {/* Mobile Menu Button (LEFT CORNER) */}
//           <button
//             className="lg:hidden flex items-center justify-center w-[44px] h-[44px] rounded-xl hover:bg-white/10 transition"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? (
//               <HiOutlineX className="text-2xl" />
//             ) : (
//               <HiOutlineMenuAlt3 className="text-2xl" />
//             )}
//           </button>

//           {/* Logo */}
//           <Link to="/" onClick={() => setOpen(false)}>
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-[60px] lg:h-[80px] w-[120px] lg:w-[150px] object-cover"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-8 text-lg font-semibold ml-6">
//             <Link className="hover:opacity-90" to="/">Home</Link>
//             <Link className="hover:opacity-90" to="/products">Products</Link>
//             <Link className="hover:opacity-90" to="/about">About</Link>
//             <Link className="hover:opacity-90" to="/contact">Contact</Link>
//           </nav>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-4">
//           <UserData />

//           <Link
//             to="/cart"
//             className="flex items-center justify-center text-2xl lg:text-3xl w-[44px] h-[44px] rounded-xl hover:bg-white/10 transition"
//             onClick={() => setOpen(false)}
//           >
//             <BsCart3 />
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {open && (
//         <div className="lg:hidden px-4 pb-4">
//           <div className="bg-white/10 border border-white/15 rounded-2xl overflow-hidden">
//             <Link to="/" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold hover:bg-white/10 transition">
//               Home
//             </Link>
//             <Link to="/products" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold hover:bg-white/10 transition">
//               Products
//             </Link>
//             <Link to="/about" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold hover:bg-white/10 transition">
//               About
//             </Link>
//             <Link to="/contact" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold hover:bg-white/10 transition">
//               Contact
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

//_________________________________________________________________________________________________________________________

// import { BsCart3 } from "react-icons/bs"
// import { Link } from "react-router-dom"

// export default function Header(){
//     return(

//         <header className="w-full h-[100px] bg-accent  text-white px-[40px]">
//             <div className="w-full h-full flex relative">
//                 <img src="/logo.png" className="h-full absolute w-[150px] left-0 object-cover" />
//                 <div className="h-full flex justify-center items-center w-full gap-[20px] text-lg">
//                     <Link to="/">Home</Link>
//                     <Link to="/products">Products</Link>
//                     <Link to="/about">About</Link>
//                     <Link to="/contact">Contact</Link>

//                 </div>
//                 <Link to="/cart" className="h-full flex right-0 absolute justify-center items-center w-[150px] text-3xl">
//                 <BsCart3/>
//                 </Link>

//             </div>
//         </header>
//     )
// }