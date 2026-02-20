import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiSettings, FiShoppingBag } from "react-icons/fi";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // NEW: logout confirmation modal state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Close dropdown when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // (Your original logout logic - unchanged)
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setOpen(false);
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center">
      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 rounded-full border-secondary/40 border-b-transparent animate-spin" />
          <span className="text-secondary/70 text-sm font-medium">Loading...</span>
        </div>
      )}

      {/* Logged in */}
      {!loading && user && (
        <div className="relative" ref={menuRef}>
          {/* Profile button */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-3 py-2 transition"
          >
            <img
              src={user.image || "/default-avatar.png"}
              alt="User"
              className="h-10 w-10 rounded-full object-cover border-2 border-primary"
            />
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-secondary font-semibold text-sm">
                {user.firstName || "User"}
              </span>
              <span className="text-secondary/70 text-xs">
                {user.role ? user.role.toUpperCase() : "MEMBER"}
              </span>
            </div>

            <FiChevronDown
              className={`text-secondary/80 transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-primary border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-secondary font-semibold text-sm">
                  {user.firstName || "User"}
                </p>
                <p className="text-secondary/70 text-xs truncate">
                  {user.email || ""}
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/account");
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-secondary hover:bg-white/10 transition"
              >
                <FiSettings />
                Account Settings
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/my-orders");
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-secondary hover:bg-white/10 transition"
              >
                <FiShoppingBag />
                Orders
              </button>

              {/* Logout -> open confirmation modal (logic unchanged, just intercept click) */}
              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}

          {/* ✅ Logout Confirmation Modal (Glassy) */}
          {showLogoutConfirm && (
            <div
              className="fixed inset-0 z-[999] flex items-center justify-center px-4"
              onClick={() => setShowLogoutConfirm(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

              {/* Modal */}
              <div
                className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-secondary text-lg font-bold">Confirm Logout</h3>
                  <button
                    className="text-secondary/70 hover:text-secondary transition text-xl"
                    onClick={() => setShowLogoutConfirm(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <p className="text-secondary/70 mt-2">
                  Are you sure you want to log out?
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    className="flex-1 h-[44px] rounded-xl border border-white/15 bg-white/10 text-secondary font-semibold hover:bg-white/35 transition"
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="flex-1 h-[44px] rounded-xl bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 active:scale-[0.99] transition"
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      logout(); // ✅ calling your original logic
                    }}
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Not logged in */}
      {!loading && user == null && (
        <Link
          to="/login"
          className="bg-accent text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 active:scale-[0.99] transition"
        >
          Login
        </Link>
      )}
    </div>
  );
}






// import axios from "axios";
// import { useEffect, useState } from "react";


// export default function UserData(){

//      const[user, setUser] = useState(null);
//      const[loading, setLoading] = useState(true);
//         useEffect(() => {
//           const token = localStorage.getItem("token");
//           if (token!=null) {
//             axios
//               .get(import.meta.env.VITE_API_URL + "/api/users/me", {
//                 headers: {
//                   Authorization: "Bearer " + token,
//                 },
//               })
//               .then((response) => {
//                 setUser(response.data);
//                 setLoading(false);
                
//               })
//               .catch(() => {
//                 localStorage.removeItem("token");
//                 setUser(null);
//                 setLoading(false);
//               });
//           }else{
//             setLoading(false);
//           }
//         }, []);
//     return(
//         <div className="flex items-center justify-center">
//             {
//                 loading && <div className="w-[30px] h-[30px] border border-[2px]   rounded-full border-primary border-b-transparent animate-spin"></div>
//             }
//             {
//                 user&& <div className="h-full w-full flex justify-center items-center gap-1">
//                     <img src={user.image} alt="" className="h-[40px] w-[40px] object-cover rounded-full border border-primary border-[4px]" />
//                     <span className="text-lg ml-2">{user.firstName}
//                     </span>
//                     <select className="bg-accent text-white p-1 rounded max-w-[20px]">
//                         <option></option>
//                         <option>Account Settings</option>
//                         <option>Orders</option>
//                         <option>Logout</option>
//                     </select>

//                 </div>
//             }
//             {
//                 (!loading && user==null) && <a href="/login" className="bg-accent text-white p-2 rounded hover:bg-secondary transmition text-lg ml-2">Login</a>
//             }
//         </div>
//     )
// }