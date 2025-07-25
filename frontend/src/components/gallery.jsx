import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const Gallery = () => {

    const [image, setImage] = useState(null);
    const [allImages, setAllImages] = useState(null);

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
        toast.error("Please select an image before uploading.");
        return;
        }

        const formData = new FormData();
        formData.append('image', image);

        await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/gallery/upload', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res.data);
            toast.success("Image uploaded successfully");

            // Clear form
            setImage(null);
            document.querySelector('input[type="file"]').value = '';
            getImages();
        }
        ).catch(err => {
            console.log(err);
            toast.error("Unable to upload image");
        })
    }

    const onImgChange = (e) => {
        setImage(e.target.files[0])
    }

    const getImages = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/gallery/getImages');
            console.log(res.data);
            setAllImages(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    // delete image
    const handleDelete = async (id) => {
        toast((t) => (
          <span>
            Are you sure, you want to delete this image?
            <div className="flex gap-2 mt-2">
            <button 
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
              onClick={async ()=>{
                toast.dismiss(t.id);
                try {
                  const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/gallery/${id}`);
                  console.log(response.data);
                  toast.success("Image deleted successfully");
                  getImages(); // Update the image list after deletion
                } catch (error) {
                  console.error(error);
                  toast.error("Unable to delete image");
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
        ));
    }

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Upload a Image</h2>
        <form onSubmit={handleImageSubmit}>
            <input 
                type="file" 
                accept="image/*" 
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={onImgChange}/>
            <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer">Upload</button>
        </form>

        {/* display all images */}
        {allImages && (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
            {allImages.map((img) => (
                <div key={img._id} className="relative group"> {/* Add group here */}
                <img 
                    src={img.url} 
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded shadow"
                />
                <button
                    onClick={() => handleDelete(img._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hidden group-hover:block"
                >
                    <FaTrashAlt className="cursor-pointer"/>
                </button>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
    </div>
  )
}

export default Gallery