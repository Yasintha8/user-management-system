import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SendPDF = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [allPdfs, setAllPdfs] = useState([]);

  // Fetch all PDFs
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/pdf/getAllPdfs"
        );
        setAllPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        toast.error("Unable to fetch PDFs");
      }
    };

    fetchPdfs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      toast.error("Please provide both title and PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/pdf/sendPdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("PDF uploaded successfully!");

      // Clear form
      setTitle('');
      setFile(null);

      // Refresh PDF list
      setAllPdfs((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error sending PDF:", error);
      toast.error(error.response?.data?.message || "Unable to send PDF");
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure, you want to delete this PDF?
        <div className="flex gap-2 mt-2">
        <button 
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          onClick={async ()=>{
            toast.dismiss(t.id);
            try {
              const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/pdf/${id}`);
              console.log(response.data);
              toast.success("PDF deleted successfully");
              setAllPdfs((prev) => prev.filter((pdf) => pdf._id !== id)); // Update the PDF list
            } catch (error) {
              console.error(error);
              toast.error("Unable to delete PDF");
            }
          }
          }
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
    ));
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-100 p-4">
      {/* Upload Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Upload a PDF</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 font-medium">PDF Title</label>
          <input
            type="text"
            required
            value={title}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block mb-1 font-medium">Select PDF File</label>
          <input
            type="file"
            accept=".pdf"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>

      {/* Display Uploaded PDFs */}
      {allPdfs.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Uploaded PDFs</h3>
          <ul className="space-y-3">
            {allPdfs.map((pdf) => (
              <li key={pdf._id} className="flex justify-between items-center border-b pb-2">
                <span>{pdf.title}</span>
                <a href={`${import.meta.env.VITE_BACKEND_URL}${pdf.fileUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                <button onClick={() => handleDelete(pdf._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SendPDF;
