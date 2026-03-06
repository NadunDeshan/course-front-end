import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function sendOTP() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/users/send-otp", {
        email: email,
      });

      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (e) {
      console.error("send otp error:", e);
      toast.error("Failed to send OTP. Please try again");
    }
  }

  async function changePassword() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/change-password",
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        }
      );

      toast.success(
        "Password changed successfully. Please login with your new password"
      );
      navigate("/login");
    } catch (e) {
      console.error("change password error:", e);
      toast.error("OTP is incorrect or expired. Please try again");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg1.jpg')] bg-cover bg-center flex justify-center items-center px-4">
      {step === "email" && (
        <div className="w-full max-w-[400px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col justify-center items-center shadow-xl">
          <h1 className="text-2xl font-semibold mb-6 text-white">
            Reset Password
          </h1>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-white/20 bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 py-3 w-full mb-4"
          />

          <button
            className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition"
            onClick={sendOTP}
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="w-full max-w-[400px] backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col justify-center items-center shadow-xl">
          <h1 className="text-2xl font-semibold mb-6 text-white">
            Reset Password
          </h1>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            className="border border-white/20 bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 py-3 w-full mb-4"
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="border border-white/20 bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 py-3 w-full mb-4"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="border border-white/20 bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 py-3 w-full mb-4"
          />

          <button
            className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition"
            onClick={changePassword}
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}


// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function ForgetPassword() {
//     const [step, setStep] = useState("email");
//     const[email,setEmail]= useState("");
//     const[otp,setOtp]= useState("");
//     const[newPassword,setNewPassword]= useState("");
//     const[confirmPassword,setConfirmPassword]= useState("");
//     const navigate = useNavigate();


//     async function sendOTP() {

//         try{
//             await axios.get(import.meta.env.VITE_API_URL+"/api/users/send-otp/"+ email)
//             toast.success("OTP sent to your email" + email);
//             setStep("otp");

//         }catch(e){
//             toast.error("Failed to send OTP. please try again")
//         }
        
//     }
//     async function changePassword(){
//         if(newPassword !== confirmPassword){
//             toast.error("Passwords do not match");
//             return;
//         }
//         try{

//             await axios.post(import.meta.env.VITE_API_URL+"/api/users/change-password",{
//                 email:email,
//                 otp:otp,
//                 newPassword:newPassword
//             })
//             toast.success("Password changed successfully please login with your new password");
//             navigate("/login");
//         }catch(e){
//             toast.error("OTP is incorrect or expired. please try again");
//             return
//         }
//     }

//     return (
//         <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center ">
//             {step=="email" &&<div className="w-[400px] h-[400px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
//                 <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
//                 <input type="email"value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" className="border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 p-3 w-full mb-4" />
//                 <button className="w-full bg-accent text-white p-3 py-2 rounded-lg hover:bg-accent/90 transition" onClick={sendOTP}>Send OTP</button>

//             </div>}
//             {step=="otp" &&<div className="w-[400px]  backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center">
//                 <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
//                 <input type="text"value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter your OTP" className="border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 p-3 w-full mb-4" />
//                 <input type="password"value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter your new password" className="border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 p-3 w-full mb-4" /> 
//                 <input type="password"value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm your new password" className="border border-secondary/20 text-secondary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-4 p-3 w-full mb-4" /> 
//                 <button className="w-full bg-accent text-white p-3 py-2 rounded-lg hover:bg-accent/90 transition" onClick={changePassword}>Change Password</button>

//             </div>}
//         </div>
//     )
// }