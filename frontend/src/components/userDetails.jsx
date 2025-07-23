import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const UserDetails = () => {

  const [Users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users')
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchUsers();
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
              const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}`);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">User Details Display</h1>
      <p className="text-center text-gray-600 mb-8">Check the details of users</p>
      <p className="text-xl font-bold text-center text-blue-700 mb-8">Total Users: {Users.length}</p>
      
      {/* Search Box */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, email or user ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid gap-6">
        {/* Display Users & search user */}
        {
          filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <p className="text-lg font-semibold text-gray-800">Name: <span className="font-normal">{user.name}</span></p>
              <p className="text-gray-600">ID: {user._id}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <div className="mt-4">
                <button 
                  onClick={() => 
                    window.location.href = `/update-user/${user._id}`
                  }
                  className="mr-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">Update</button>
                <button 
                  onClick={() => handleDelete(user._id)}
                  className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer">Delete</button>  
                <button 
                  onClick={() => sendWhatsAppMessage(user)}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
                >
                  Send via WhatsApp
                </button>
              </div>
            </div>
          ))
        ):
        
          <p className="mt-4 text-center text-gray-600">No user found</p>
        
      }
        </div>
        <button
          onClick={downloadPDF}
          className="mb-6 mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Download PDF Report
        </button>
    </div>

  )
}

export default UserDetails