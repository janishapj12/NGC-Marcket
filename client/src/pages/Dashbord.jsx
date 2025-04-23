import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-10">
      <ul className="space-y-10">
        <li><Link to="/profile/:id" className="hover:text-gray-400">Profile</Link></li>
   
        <li><Link to="/Product" className="hover:text-gray-400">Product</Link></li>
    
        <li><Link to="/tables" className="hover:text-gray-400">Tables</Link></li>
    
        <li><Link to="/charts" className="hover:text-gray-400">Charts</Link></li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-4 gap-4 mt-6">
          </div>
        </div>
      </div>
 
  );
};

export default Dashboard;