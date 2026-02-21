import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../src/components/loader,";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

function UserBlockConfirm(props){
  const email=props.user.email;
  const close=props.close;
  const refresh=props.refresh;

  function blockUser(){
    const token = localStorage.getItem("token");
    axios
    .put(import.meta.env.VITE_API_URL + "/api/users/block/" + email,{
        isBlock: !props.user.isBlock
    
    },{
      headers:{
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("User block status updated successfully")
        refresh();
      }).catch((error)=>{
        toast.error("Failed to change user block status");
      });
      
  }
  return(
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[500px] h-[200px] bg-white relative flex flex-col justify-center items-center gap-[20px]">
          <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
            x
          </button>
          <p className="text-xl font-semibold text-center">Are you sure want to {props.user.isBlock ? "unblock" : "block"} the user with email : {email} ?</p>
          <div className="flex gap-[40px]">
            <button onClick={close} className="w-[100px] bg-red-500 text-white hover:bg-accent">Cancel</button>
            <button onClick={blockUser} className="w-[100px] bg-green-500 text-white hover:bg-accent">Yes</button>
          </div>
        </div>
      </div>
  )
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible,setIsBlockConfirmVisble]=useState(false);
  const[userToBlock, setUserToBlock]= useState(null);
  const[isLoading,setIsLoding]= useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoading){
    const token= localStorage.getItem("token");
    if(token==null){
      toast.error("Please login to access admin panel");
      navigate("/login");
      return
    }
      axios
      .get(import.meta.env.VITE_API_URL + "/api/users/all-users",{
        headers:{
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setIsLoding(false);
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6">
      {
        isBlockConfirmVisible && <UserBlockConfirm refresh={()=>{setIsLoding(true)}} user={userToBlock} close={()=>{setIsBlockConfirmVisble(false)}}/>
      }
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/15 bg-primary/40">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Users</h1>
            <p className="text-base text-secondary/70">
              Manage your users list
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          {isLoading?<Loader/>:
            <table className="w-full text-left">
            <thead className="bg-primary/70 border-b border-white/15">
              <tr className="text-base font-semibold text-secondary uppercase">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="hover:bg-white/10 transition text-base"
                >
                  <td className="px-6 py-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden ring-1 ring-white/20">
                      <img
                        src={user.image}
                        referrerPolicy="no-referrer"
                        // className="w-full h-full object-cover"
                        alt={user.firstName}
                        className={"h-16 w-16 object-cover rounded-full border-7"+(user.isBlock?" border-red-500": " border-green-500")}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                    {user.email}{user.isEmailVerified&&<MdVerified color="blue"/>}
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                    {user.firstName}
                  </td>

                  <td className="px-6 py-4 font-semibold text-secondary">
                     {user.lastName}
                  </td>

                  <td className="px-6 py-4 text-secondary/70 ">
                  <div className="flex gap-4 justify-center items-center text-xl">
                    {user.role=="admin"&&<MdOutlineAdminPanelSettings/>}
                     {user.role}
                  </div>
                     
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4 justify-center items-center text-xl">
                      <button onClick={
                        () => {
                          setIsBlockConfirmVisble(true);
                          setUserToBlock(user);
                        }
                      }
                      className="w-[100px] h-[30px] rounded-full cursor-pointer text-white bg-accent hover:bg-accent/70">{user.isBlock?"Unblock": "Block"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/15 bg-primary/40 text-base text-secondary/80">
          Showing <span className="font-bold">{users.length}</span> Users
        </div>
      </div>
    </div>
  );
}