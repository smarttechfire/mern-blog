import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../FirebaseConfig";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSucess, setUpdateUserSucess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // console.log(imageFile,imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const handleChange = (e) => {
      setFormData({...formData,[e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSucess(null);
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No change made');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSucess("User's Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }
  const uploadImage = async () => {

    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData,profilePicture: downloadURL});
          setImageFileUploading(false);
        });
      }
    );
  };
  
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className=" my-7 text-center font-semibold text-3xl">Profile</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
      />
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}              
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username} onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email} onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="password"  onChange={handleChange}/>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete Account</span>
        <span className=" cursor-pointer">Sign Out</span>
      </div>
      {updateUserSucess && (
        <Alert color='success' className=" mt-5">
          {updateUserSucess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className=" mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}
