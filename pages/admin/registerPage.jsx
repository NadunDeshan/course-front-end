import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("")
  const[lastName, setLastName] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();

  async function register() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }
      );
      toast.success("Registration Successfull..Please Login");
      navigate("/login"); 
    } catch (e) {
      console.error("register failed", e);
      toast.error("Registration failed. Please try again");
    }
  }

  return (
    <div className="relative w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      {/* overlay for better readability */}
      <div className="absolute inset-0 bg-secondary/60" />

      {/* Grid Wrapper */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE (FORM) */}
        <div className="flex items-center justify-center px-6 sm:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* top accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-accent via-white/40 to-accent" />

              <div className="p-8 sm:p-10">
                {/* mobile logo */}
                <div className="lg:hidden flex justify-center mb-6">
                  <img src="/logo.png" alt="ND Logo" className="h-10 w-auto" />
                </div>

                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                    Register to ND
                  </h1>
                  <p className="mt-2 text-sm text-white/70">
                    Use your email and password to continue
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John"
                      autoComplete="given-name"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. doe"
                      autoComplete="family-name"
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
                    />
                  </div>

                  <button
                    onClick={register}
                    className="mt-2 w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/30 hover:brightness-110 active:scale-[0.99] transition"
                  >
                    Register
                  </button>

                  <div className="pt-4 flex items-center justify-center gap-2 text-xs text-white/60">
                    <span className="h-px w-12 bg-white/20" />
                    <span>Alredy have an account? </span>
                    <Link to="/login"
                    className="text-accent hover:underline underline-offset-4"
                    >Create you</Link>
                    <span className="h-px w-12 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* tiny footer */}
            <p className="mt-6 text-center text-xs text-white/60">
              © {new Date().getFullYear()} ND — Global • All rights reserved
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (BRANDING) */}
        <div className="hidden lg:flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ND Logo" className="h-10 w-auto" />
            <div className="text-white">
              <p className="text-sm tracking-wider uppercase opacity-90">
                ND • Crystal Beauty Clear
              </p>
              {/* <p className="text-2xl font-semibold">Welcome back</p> */}
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-white text-4xl font-bold leading-tight">
              Beauty that feels <span className="text-accent">premium</span>.
            </h2>
            <p className="mt-4 text-white/80 text-base leading-relaxed">
              Sign in to manage your products, orders, and customer experience —
              all in one place.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
              <span className="text-white/80 text-sm">
                Secure login • Fast access • Modern dashboard
              </span>
            </div>
          </div>

          <div className="text-white/60 text-xs">
            Built with care for a smooth shopping experience.
          </div>
        </div>
      </div>
    </div>
  );
}



// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate()

//   async function login() {
//     try {
//       const response = await axios.post(
//         import.meta.env.VITE_API_URL + "/api/users/login",
//         {
//           email: email,
//           password: password,
//         }
//       );
//       localStorage.setItem("token",response.data.token)
//       toast.success("Login Successfull..")
//       const user = response.data.user;

//       if (user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (e) {
//       console.error("login failed", e);
//       toast.error("Login Failed Please check your credincials")
//     }
//   }

//   return (
//     <div className="relative w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
//       {/* overlay for better readability */}
//       <div className="absolute inset-0 bg-secondary/60" />

//       <div className="flex flex-row relative  z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">
        
//         {/* Right side (form) */}
//         <div className="flex items-center justify-center px-6 sm:px-10">
//           <div className="w-full max-w-md">
//             <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
//               {/* top accent bar */}
//               <div className="h-1.5 w-full bg-gradient-to-r from-accent via-white/40 to-accent" />

//               <div className="p-8 sm:p-10">
//                 {/* mobile logo */}
//                 <div className="lg:hidden flex justify-center mb-6">
//                   <img src="/logo.png" alt="ND Logo" className="h-10 w-auto" />
//                 </div>

//                 <div className="text-center">
//                   <h1 className="text-2xl sm:text-3xl font-semibold text-white">
//                     Sign in to ND
//                   </h1>
//                   <p className="mt-2 text-sm text-white/70">
//                     Use your email and password to continue
//                   </p>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm text-white/80">Email</label>
//                     <input
//                       type="email"
//                       placeholder="you@example.com"
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm text-white/80">Password</label>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full h-11 rounded-xl bg-white/90 px-4 text-secondary placeholder:text-secondary/50 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-accent transition"
//                     />
//                   </div>

//                   <button
//                     onClick={login}
//                     className="mt-2 w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/30 hover:brightness-110 active:scale-[0.99] transition"
//                   >
//                     Login
//                   </button>

//                   <div className="pt-4 flex items-center justify-center gap-2 text-xs text-white/60">
//                     <span className="h-px w-12 bg-white/20" />
//                     <span>ND Crystal Beauty Clear</span>
//                     <span className="h-px w-12 bg-white/20" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Left side (branding) */}
//         <div className="hidden lg:flex flex-col justify-between p-12">
//           <div className="flex items-center gap-3">
//             <img src="/logo.png" alt="ND Logo" className="h-10 w-auto" />
//             <div className="text-white">
//               <p className="text-sm tracking-wider uppercase opacity-90">
//                 ND • Crystal Beauty Clear
//               </p>
//               <p className="text-2xl font-semibold">Welcome back</p>
//             </div>
//           </div>

//           <div className="max-w-md">
//             <h2 className="text-white text-4xl font-bold leading-tight">
//               Beauty that feels <span className="text-accent">premium</span>.
//             </h2>
//             <p className="mt-4 text-white/80 text-base leading-relaxed">
//               Sign in to manage your products, orders, and customer experience —
//               all in one place.
//             </p>

//             <div className="mt-8 flex items-center gap-3">
//               <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
//               <span className="text-white/80 text-sm">
//                 Secure login • Fast access • Modern dashboard
//               </span>
//             </div>
//           </div>
//         </div>

//             {/* tiny footer */}
//             <p className="mt-6 text-center text-xs text-white/60">
//               © {new Date().getFullYear()} ND — Global • All rights reserved
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
