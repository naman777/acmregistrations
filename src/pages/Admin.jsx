import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminPortal from "./AdminComponent";
import { backendUrl } from "../const/const";
import { useNavigate } from "react-router-dom";



const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null);     // Track errors
    const [length, setLength] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetch = async ( ) =>{
            try {
                const res = await axios.post(backendUrl+"/verify",{
                    token:localStorage.getItem("token")
                })
                if(res.data.success){
                    setUsers(res.data.users)
                    setLength(res.data.length)
                }
                else{
                    navigate("/admin/login");
                }

            } catch (error) {
                
            }
        }
        fetch();
    },[])
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await axios.post(backendUrl+"/data");
          setLength(res.data.length);
          setUsers(res.data.user);  // Assuming 'users' is in the response data
        } catch (err) {
          setError("Failed to fetch data"); // Handle errors
          console.error("Error fetching users:", err); 
        } finally {
          setLoading(false); // Turn off loading when done
        }
      };
      fetchUsers();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // Show loading spinner or text
    }
  
    if (error) {
      return <div>Error: {error}</div>; // Show error message
    }
  
    return (
      <div>
        {users && users.length > 0 ? (
          <AdminPortal users={users} usersCount={length} />
        ) : (
          <p>No users found</p>
        )}
      </div>
    );
  };
  
  export default Admin;
