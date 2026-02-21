import axios from "axios";
import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UserSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUser(response.data); 
    
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  async function updateUserData() {
    const data={
      firstName:firstName,
      lastName:lastName,
      image : user.image
    }
    if(image != null){
        const link= await mediaUpload(image);
        image.profilePicture = link;
    }
    await axios.put(import.meta.env.VITE_API_URL+"/api/users/me",data,{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(()=>{
      toast.success("Profile updated successfully");
    }).catch((err)=>{
        console.error("update failed", err);
      toast.error("Failed to update profile");
    });
    navigate("/");
    
  }

  async function updatePassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await axios.put(import.meta.env.VITE_API_URL+"/api/users/me/password",{
      password:password,
    },{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(()=>{
      toast.success("Password updated successfully");
      setPassword("");
      setConfirmPassword("");
    }).catch((err)=>{
        console.error("update failed", err);
      toast.error("Failed to update password");
    });
    navigate("/");
    
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center p-6">
      {/* Big wrapper */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: USER INFO */}
        <div className="backdrop-blur-2xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-secondary">User Settings</h1>
          <p className="text-sm text-secondary/70 mt-1">
            Update your profile information
          </p>

          {/* Avatar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/40 bg-white/30 flex items-center justify-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-secondary/70 text-sm">No Image</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl
                           file:border-0 file:bg-accent file:text-white hover:file:brightness-110"
              />
              <p className="text-xs text-secondary/60">
                JPG/PNG recommended. Square image looks best.
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="w-full h-11 rounded-xl bg-white/80 px-4 text-secondary placeholder:text-secondary/50
                           outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="w-full h-11 rounded-xl bg-white/80 px-4 text-secondary placeholder:text-secondary/50
                           outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            <button
              onClick={updateUserData}
              className="w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/30
                         hover:brightness-110 active:scale-[0.99] transition"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* RIGHT: PASSWORD CHANGE */}
        <div className="backdrop-blur-2xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-secondary">Change Password</h2>
          <p className="text-sm text-secondary/70 mt-1">
            Use a strong password for better security
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-11 rounded-xl bg-white/80 px-4 text-secondary placeholder:text-secondary/50
                           outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full h-11 rounded-xl bg-white/80 px-4 text-secondary placeholder:text-secondary/50
                           outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-accent transition"
              />
            </div>

            <button
              onClick={updatePassword}
              className="w-full h-11 rounded-xl bg-secondary text-white font-semibold shadow-lg
                         hover:brightness-110 active:scale-[0.99] transition"
            >
              Update Password
            </button>

            <p className="text-xs text-secondary/60">
              Tip: Use at least 8 characters with numbers and symbols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}