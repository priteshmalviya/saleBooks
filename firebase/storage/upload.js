import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addProduct} from "../firestore/write";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function upload(file,data) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();
  // Create a storage reference from our storage service
  const storageRef = ref(storage, "image/" + data.ProductName);

  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
  (snapshot) => {
  }, 
  (error) => {
    alert(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //console.log('File available at', downloadURL);
      toast.success('Upload Complete', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        data.Producturl=downloadURL;
        addProduct(data);
    });
  }
);

return(<>
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
</>)
}

export default upload;
