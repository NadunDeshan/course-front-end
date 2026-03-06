import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import UserData from "./userData";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);

  // ✅ search states
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate()

  // ✅ for debounce + cancel request
  const timerRef = useRef(null);
  const abortRef = useRef(null);

    // ✅ hide header on scroll down
  const [hideHeader, setHideHeader] = useState(false);
  const lastYRef = useRef(0);

    useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // hide only after some scroll (so it doesn't hide instantly)
      if (y > lastYRef.current && y > 80) {
        setHideHeader(true);   // scrolling down
      } else {
        setHideHeader(false);  // scrolling up
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goSearch(q) {
    const text = (q ?? searchTerm).trim();
    setShowSuggestions(false);

    if (!text) navigate("/products");
    else navigate(`/products?search=${encodeURIComponent(text)}`);
  }

  function pickSuggestion(name) {
    setSearchTerm(name);
    setShowSuggestions(false);
    goSearch(name);
  }

  // ✅ auto fetch suggestions (debounced)
  useEffect(() => {
    const value = searchTerm.trim();

    // if empty -> close dropdown
    if (!value) {
      setSuggestions([]);
      setIsLoding(false);
      setShowSuggestions(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    setShowSuggestions(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        // cancel previous request
        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        setIsLoding(true);

        const res = await axios.get(
          import.meta.env.VITE_API_URL +
            "/api/products/search/" +
            encodeURIComponent(value),
          { signal: abortRef.current.signal },
        );

        // ✅ support both [] and {products: []}
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        setSuggestions(data.slice(0, 6));
        setIsLoding(false);
      } catch (err) {
        // ignore cancelled
        if (err.code === "ERR_CANCELED") return;

        console.error("Search error:", err.response?.data || err.message);
        setIsLoding(false);
        toast.error("Failed to search products");
      }
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchTerm]);


  return (
    <header
  className={[
    "bg-black/50 border-b border-secondary/15 sticky top-0 z-50",
    "transition-transform duration-300",
    hideHeader ? "-translate-y-full" : "translate-y-0",
  ].join(" ")}
>
      {/* TOP ROW */}
      <div className="w-full mx-auto h-[84px] lg:h-[70px] px-4 lg:px-2 flex items-center justify-between gap-4">
          {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden flex items-center justify-center w-[46px] h-[46px] rounded-2xl
            bg-accent border border-secondary/15 hover:bg-tertiary transition active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <HiOutlineX className="text-2xl text-white" />
            ) : (
              <HiOutlineMenuAlt3 className="text-2xl text-white" />
            )}
          </button>

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <img
              src="/logo1.png"
              alt="Logo"
              className="h-[64px] lg:h-[250px] w-[250px] lg:w-[200px] rounded-full pt-1 object-contain "
            />
          </Link>
        </div>

        {/* CENTER NAV (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            className="px-4 py-2 rounded-xl font-bold text-white hover:scale-110 transition duration-300"
            to="/"
          >
            Home
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-bold text-white hover:scale-110 transition duration-300"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-bold text-white hover:scale-110 transition duration-300"
            to="/about"
          >
            About
          </Link>
          <Link
            className="px-4 py-2 rounded-xl font-bold text-white hover:scale-110 transition duration-300"
            to="/contact"
          >
            Contact
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 lg:gap-4">
          <UserData />
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-[50px] h-[59px] rounded-2xl
            bg-accent text-white shadow-md hover:bg-tertiary transition active:scale-95"
            onClick={() => setOpen(false)}
            aria-label="Cart"
          >
            <BsCart3 className="text-2xl" />
          </Link>
        </div>
      </div>

      {/* ✅ SEARCH BAR ROW (mobile + desktop) */}
      <div className="w-full px-4 lg:px-2 pb-1">
        <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-secondary/10 shadow-lg px-2 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* input + dropdown */}
            <div className="relative flex gap-3 flex-1 rounded-2xl px-2 py-0 bg-primary border border-secondary/10">
              <span className="text-secondary/70 text-lg">🔎</span>

              <input
                type="text"
                value={searchTerm}
                placeholder="Search products by name..."
                className="flex-1 bg-transparent outline-none text-secondary placeholder:text-secondary/45"
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim()) setShowSuggestions(true);
                }}
                onBlur={() => {
                  // allow clicking suggestion before closing
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goSearch();
                }}
              />

              {showSuggestions && (
                <div className="absolute left-0 top-full mt-2 w-full rounded-2xl bg-white border border-secondary/15 shadow-lg overflow-hidden z-50">
                  {isLoading ? (
                    <div className="px-4 py-3 text-secondary/70">
                      Searching...
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="px-4 py-3 text-secondary/70">
                      No products found
                    </div>
                  ) : (
                    suggestions.map((p) => (
                      <button
                        key={p._id || p.productID}
                        type="button"
                        onMouseDown={() => pickSuggestion(p.name)} // ✅ best for blur issue
                        className="w-full text-left px-4 py-3 hover:bg-primary transition"
                      >
                        <div className="font-semibold text-secondary">
                          {p.name}
                        </div>
                        {p.catagory && (
                          <div className="text-sm text-secondary/60">
                            {p.catagory}
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* buttons */}
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                  navigate("/products");
                }}
                className="px-4 py-2 rounded-2xl bg-white text-secondary font-semibold
                border border-secondary/15 hover:bg-primary transition active:scale-95"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => goSearch()}
                className="px-4 py-2 rounded-2xl bg-accent text-white font-bold
                shadow-md shadow-accent/20 hover:brightness-110 transition active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
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

// ------------------------------------------------------------
// import { BsCart3 } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import UserData from "./userData";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoding] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false); // ✅ NEW
//   const navigate = useNavigate();

//   return (
//     <header className="w-full bg-white border-b border-secondary/15 sticky top-0 z-50">
//       {/* TOP ROW */}
//       <div className="w-full mx-auto h-[84px] lg:h-[90px] px-4 lg:px-2 relative flex items-center justify-between">
//         {/* LEFT */}
//         <div className="flex items-center gap-3">
//           <button
//             className="lg:hidden flex items-center justify-center w-[46px] h-[46px] rounded-2xl
//             bg-accent border border-secondary/15 hover:bg-tertiary transition active:scale-95"
//             onClick={() => setOpen(!open)}
//             aria-label="Toggle menu"
//           >
//             {open ? (
//               <HiOutlineX className="text-2xl text-white" />
//             ) : (
//               <HiOutlineMenuAlt3 className="text-2xl text-white" />
//             )}
//           </button>

//           <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-[64px] lg:h-[84px] w-[150px] lg:w-[200px] object-contain"
//             />
//           </Link>
//         </div>

//         {/* CENTER NAV */}
//         <div className="hidden lg:flex items-center gap-3">
//           <Link className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300" to="/">Home</Link>
//           <Link className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300" to="/products">Products</Link>
//           <Link className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300" to="/about">About</Link>
//           <Link className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300" to="/contact">Contact</Link>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3 lg:gap-4">
//           <UserData />
//           <Link
//             to="/cart"
//             className="relative flex items-center justify-center w-[50px] h-[59px] rounded-2xl
//             bg-accent text-white shadow-md hover:bg-tertiary transition active:scale-95"
//             onClick={() => setOpen(false)}
//             aria-label="Cart"
//           >
//             <BsCart3 className="text-2xl" />
//           </Link>
//         </div>
//       </div>
//       {/* MOBILE NAV */}
//       {open && (
//         <div className="lg:hidden px-4 pb-4">
//           <div className="bg-white border border-secondary/15 rounded-2xl overflow-hidden shadow-sm">
//             <Link to="/" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition">Home</Link>
//             <Link to="/products" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition">Products</Link>
//             <Link to="/about" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition">About</Link>
//             <Link to="/contact" onClick={() => setOpen(false)} className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition">Contact</Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

//----------------------------------------------------------------------------------------------------------
// import { BsCart3 } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import UserData from "./userData";
// import axios from "axios";
// import toast from "react-hot-toast"; // ✅ FIX 1: add this
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoding] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   function handleSearch() {
//     const q = searchTerm.trim();
//     if (q === "") {
//       navigate("/products");
//     } else {
//       navigate(`/products?search=${encodeURIComponent(q)}`);
//     }
//   }
//   function handlePickSuggestion(name) {
//     setSearchTerm(name); // ✅ put text into input
//     setProducts([]); // ✅ close dropdown
//     setIsLoding(false);

//     // ✅ go to product page with search query (recommended)
//     navigate(`/products?search=${encodeURIComponent(name)}`);
//   }

//   return (
//     <header className="w-full bg-white border-b border-secondary/15 sticky top-0 z-50">
//       {/* TOP ROW */}
//       <div className="w-full mx-auto h-[84px] lg:h-[90px] px-4 lg:px-2 relative flex items-center justify-between">
//         {/* LEFT */}
//         <div className="flex items-center gap-3">
//           <button
//             className="lg:hidden flex items-center justify-center w-[46px] h-[46px] rounded-2xl
//             bg-accent border border-secondary/15 hover:bg-tertiary transition active:scale-95"
//             onClick={() => setOpen(!open)}
//             aria-label="Toggle menu"
//           >
//             {open ? (
//               <HiOutlineX className="text-2xl text-white" />
//             ) : (
//               <HiOutlineMenuAlt3 className="text-2xl text-white" />
//             )}
//           </button>

//           <Link
//             to="/"
//             onClick={() => setOpen(false)}
//             className="flex items-center"
//           >
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-[64px] lg:h-[84px] w-[150px] lg:w-[200px] object-contain"
//             />
//           </Link>
//         </div>

//         {/* CENTER NAV (Desktop only) */}
//         <div className="hidden lg:flex items-center gap-3">
//           <Link
//             className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//             to="/"
//           >
//             Home
//           </Link>
//           <Link
//             className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//             to="/products"
//           >
//             Products
//           </Link>
//           <Link
//             className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//             to="/about"
//           >
//             About
//           </Link>
//           <Link
//             className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//             to="/contact"
//           >
//             Contact
//           </Link>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3 lg:gap-4">
//           <div className="flex items-center">
//             <UserData />
//           </div>

//           <Link
//             to="/cart"
//             className="relative flex items-center justify-center w-[50px] h-[59px] rounded-2xl
//             bg-accent text-white shadow-md hover:bg-tertiary transition active:scale-95"
//             onClick={() => setOpen(false)}
//             aria-label="Cart"
//           >
//             <BsCart3 className="text-2xl" />
//           </Link>
//         </div>
//       </div>

//       {/* ✅ SEARCH BAR ROW (Visible on mobile + desktop) */}
//       <div className="w-full px-4 lg:px-2 pb-3">
//         <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-secondary/10 shadow-lg px-4 py-3">
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//             {/* ✅ make this wrapper RELATIVE for dropdown */}
//             <div className="relative flex gap-3 flex-1 rounded-2xl px-4 py-2 bg-primary border border-secondary/10">
//               <span className="text-secondary/70 text-lg">🔎</span>

//               <input
//                 id="product-search-input"
//                 type="text"
//                 value={searchTerm} // ✅ add this
//                 placeholder="Search products by name..."
//                 className="flex-1 bg-transparent outline-none text-secondary placeholder:text-secondary/45"
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchTerm(value);

//                   if (window.__productSearchTimer)
//                     clearTimeout(window.__productSearchTimer);

//                   window.__productSearchTimer = setTimeout(async () => {
//                     try {
//                       if (value.trim() === "") {
//                         setProducts([]);
//                         setIsLoding(false);
//                         return;
//                       }

//                       setIsLoding(true);
//                       const searchResult = await axios.get(
//                         import.meta.env.VITE_API_URL +
//                           "/api/products/search/" +
//                           encodeURIComponent(value.trim()),
//                       );

//                       setProducts(searchResult.data);
//                       setIsLoding(false);
//                     } catch (err) {
//                       console.error(
//                         "Search error:",
//                         err.response?.data || err.message,
//                       );
//                       setIsLoding(false);
//                       toast.error("Failed to search products");
//                     }
//                   }, 400);
//                 }}
//               />

//               {/* ✅ RESULTS DROPDOWN */}
//               {/* ✅ RESULTS DROPDOWN */}
//               {(isLoading ||
//                 products.length > 0 ||
//                 searchTerm.trim() !== "") && (
//                 <div className="absolute left-0 top-full mt-2 w-full rounded-2xl bg-white border border-secondary/15 shadow-lg overflow-hidden z-50">
//                   {isLoading ? (
//                     <div className="px-4 py-3 text-secondary/70">
//                       Searching...
//                     </div>
//                   ) : products.length === 0 ? (
//                     <div className="px-4 py-3 text-secondary/70">
//                       No products found
//                     </div>
//                   ) : (
//                     products.slice(0, 6).map((p) => (
//                       <button
//                         key={p._id || p.productID}
//                         type="button"
//                         onClick={() => handlePickSuggestion(p.name)}
//                         className="w-full text-left px-4 py-3 hover:bg-primary transition"
//                       >
//                         <div className="font-semibold text-secondary">
//                           {p.name}
//                         </div>
//                         {p.catagory && (
//                           <div className="text-sm text-secondary/60">
//                             {p.catagory}
//                           </div>
//                         )}
//                       </button>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-3 justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   const input = document.querySelector("#product-search-input");
//                   if (input) input.value = "";
//                   setSearchTerm("");
//                   setProducts([]);
//                   setIsLoding(false);
//                   navigate("/products"); // ✅ important
//                 }}
//                 className="px-4 py-2 rounded-2xl bg-white text-secondary font-semibold
//           border border-secondary/15 hover:bg-primary transition active:scale-95"
//               >
//                 Clear
//               </button>

//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="px-4 py-2 rounded-2xl bg-accent text-white font-bold
//   shadow-md shadow-accent/20 hover:brightness-110 transition active:scale-95"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE NAV DROPDOWN */}
//       {open && (
//         <div className="lg:hidden px-4 pb-4">
//           <div className="bg-white border border-secondary/15 rounded-2xl overflow-hidden shadow-sm">
//             <Link
//               to="/"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Home
//             </Link>
//             <Link
//               to="/products"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Products
//             </Link>
//             <Link
//               to="/about"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Contact
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }---------------------------------------------------------------------------------------------------------

// import { BsCart3 } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import UserData from "./userData";
// import axios from "axios";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoding] = useState(true);

//   return (
//     <header className="w-full bg-white border-b border-secondary/15 sticky top-0 z-50 ">
//       <div className="w-full w-full mx-auto h-[84px] lg:h-[90px]  px-4 lg:px-2 relative flex items-center justify-between">
//         {/* LEFT SIDE: logo (top-left) + mobile menu */}
//         <div className="flex items-center gap-3">
//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden flex items-center justify-center w-[46px] h-[46px] rounded-2xl
//             bg-accent border border-secondary/15
//             hover:bg-tertiary transition  active:scale-95"
//             onClick={() => setOpen(!open)}
//             aria-label="Toggle menu"
//           >
//             {open ? (
//               <HiOutlineX className="text-2xl text-white" />
//             ) : (
//               <HiOutlineMenuAlt3 className="text-2xl text-white" />
//             )}
//           </button>

//           {/* Logo */}
//           <Link
//             to="/"
//             onClick={() => setOpen(false)}
//             className="flex items-center"
//           >
//             <img
//               src="/logo.png"
//               alt="Logo"
//               className="h-[64px] lg:h-[84px] w-[150px] lg:w-[200px] object-contain"
//             />
//           </Link>
//         </div>

//         {/* CENTER: Desktop Navigation */}
//         <div className=" absolute top-0 left-1/2 -translate-x-1/2">
//           <nav className="hidden lg:flex items-center gap-3">
//             <Link
//               className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//               to="/"
//             >
//               Home
//             </Link>
//             <Link
//               className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//               to="/products"
//             >
//               Products
//             </Link>
//             <Link
//               className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//               to="/about"
//             >
//               About
//             </Link>
//             <Link
//               className="px-4 py-2 rounded-xl font-bold text-secondary hover:scale-110 transition duration-300"
//               to="/contact"
//             >
//               Contact
//             </Link>

//             {/* Search Bar */}
//             <div className="mt-2 flex">
//               <div className="w-full max-w-6xl rounded-3xl bg-white border border-secondary/10 shadow-lg px-4 py-4">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                   <div className="flex gap-3 flex-1 rounded-2xl px-10 py-1 bg-primary border border-secondary/10">
//                     <span className="text-secondary/70 text-lg">🔎</span>

//                     <input
//                       id="product-search-input"
//                       type="text"
//                       placeholder="Search products by name..."
//                       className="flex-1 bg-transparent outline-none text-secondary placeholder:text-secondary/45"
//                       onChange={(e) => {
//                         const value = e.target.value;

//                         if (window.__productSearchTimer)
//                           clearTimeout(window.__productSearchTimer);

//                         window.__productSearchTimer = setTimeout(async () => {
//                           try {
//                             if (value.trim() === "") {
//                               setIsLoding(true);
//                               return;
//                             }

//                             setIsLoding(true);
//                             const searchResult = await axios.get(
//                               import.meta.env.VITE_API_URL +
//                                 "/api/products/search/" +
//                                 encodeURIComponent(value.trim()),
//                             );

//                             setProducts(searchResult.data);
//                             setIsLoding(false);
//                           } catch (err) {
//                             console.error(
//                               "Search error:",
//                               err.response?.data || err.message,
//                             );
//                             setIsLoding(false);
//                             toast.error("Failed to search products");
//                           }
//                         }, 400);
//                       }}
//                     />
//                   </div>

//                   <div className="flex items-center gap-3 justify-end">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const input = document.querySelector(
//                           "#product-search-input",
//                         );
//                         if (input) input.value = "";
//                         setIsLoding(true);
//                       }}
//                       className="px-4 py-1 rounded-2xl bg-white text-secondary font-semibold
//                       border border-secondary/15 hover:bg-primary transition active:scale-95"
//                     >
//                       Clear
//                     </button>

//                     <button
//                       type="button"
//                       className="px-4 py-1 rounded-2xl bg-accent text-white font-bold
//                       shadow-md shadow-accent/20 hover:brightness-110 transition active:scale-95"
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </div>

//                 {/* <p className="mt-3 text-sm text-secondary/55">
//                     Example: “cream”, “serum”, “lipstick”, “sunscreen”
//                   </p> */}
//               </div>
//             </div>
//           </nav>
//         </div>

//         {/* RIGHT SIDE: User/Login + Cart (top-right) */}
//         <div className="flex items-center  gap-3 lg:gap-4 ">
//           {/* User / Login */}
//           <div className="flex items-center">
//             <UserData />
//           </div>

//           {/* Cart */}
//           <Link
//             to="/cart"
//             className="relative flex items-center justify-center w-[50px] h-[59px] rounded-2xl
//             bg-accent text-white shadow-md hover:bg-tertiary transition active:scale-95"
//             onClick={() => setOpen(false)}
//             aria-label="Cart"
//           >
//             <BsCart3 className="text-2xl" />
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {open && (
//         <div className="lg:hidden px-4 pb-4">
//           <div className="bg-white border border-secondary/15 rounded-2xl overflow-hidden shadow-sm">
//             <Link
//               to="/"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Home
//             </Link>
//             <Link
//               to="/products"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Products
//             </Link>
//             <Link
//               to="/about"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               onClick={() => setOpen(false)}
//               className="block px-5 py-4 font-semibold text-secondary hover:bg-primary transition"
//             >
//               Contact
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

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
