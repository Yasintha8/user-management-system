import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UserDetails = () => {
  const [Users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data || []);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
    useEffect(() => {
      if (!token) {
        toast.error("Please login to access users");
        window.location.href = "/login"; // or navigate('/login') if using useNavigate
      } else {
        fetchUsers();
      }
    }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure, you want to delete this user?
        <div className="flex gap-2 mt-2">
        <button 
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          onClick={async ()=>{
            toast.dismiss(t.id);
            try {
              const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              console.log(response.data);
              toast.success("User deleted successfully");
              fetchUsers();
            } catch (error) {
              console.error(error);
              toast.error("Unable to delete user");
            }
          }}
          >
          Yes
        </button>
        <button 
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
          onClick={() => toast.dismiss(t.id)}
          >
          No
        </button>
        </div>
      </span>
    ))
  }

  //----------Function for download User Details as pdf-----------
  const downloadPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.text("User Details Report", 14, 15);

  // Prepare data
  const tableColumn = ["Name", "Email", "Age", "Address"];
  const tableRows = Users.map(user => [
    user.name,
    user.email,
    user.age,
    user.address
  ]);

  // Draw table
  autoTable(doc, {
    startY: 20,
    head: [tableColumn],
    body: tableRows,
  });

  // Save PDF
  doc.save("user-report.pdf");
};

  //----------Search User Function-----------
  const [search, setSearch] = useState('');

  const filteredUsers = Users.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase()) ||
  user._id.toLowerCase().includes(search.toLowerCase())
);

  //----------Send UserDetails through whatsapp Message Function-------

  const sendWhatsAppMessage = (user) => {
  const phoneNumber = user.phone || "+94765865283"; // fallback number
  const message = `Hello, I'm a user of your application. Here are my details:\n\nName: ${user.name}\nEmail: ${user.email}\nAge: ${user.age}\nAddress: ${user.address}\n\nThank you!`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');  // Open in a new tab
};

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600 mb-4">Manage and view user details</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Total Users: <span className="font-medium text-gray-900">{Users.length}</span>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Box */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, email or user ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                    <p className="text-sm text-gray-900 mt-1 font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Age</label>
                    <p className="text-sm text-gray-900 mt-1">{user.age}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">ID</label>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{user._id}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</label>
                  <p className="text-sm text-gray-900 mt-1">{user.address}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => window.location.href = `/update-user/${user._id}`}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="bg-white hover:bg-red-50 text-red-600 border border-red-300 px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Delete
                  </button>  
                  <button 
                    onClick={() => sendWhatsAppMessage(user)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Send via WhatsApp
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
              {search && (
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetails