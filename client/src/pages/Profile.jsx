import { CgProfile } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log("imagePercent:-" + imagePercent);
  console.log("form--" + formData);
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <div className="flex  justify-center items-center mt-3 gap-2">
        <CgProfile className=" size-8 text-blue-700 rounded-lg cursor-pointer" />
        <h1 className="text-2xl font-medium  hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
          Profile
        </h1>
      </div>
      <form action="" className=" flex flex-col mt-3 gap-4 ">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser?.avatar}
          alt={currentUser.username}
          onClick={() => fileRef.current.click()}
          className=" size-24 self-center rounded-full  cursor-pointer object-cover "
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="User name"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className=" bg-slate-100 rounded-lg p-3"
        />
        <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className=" flex justify-between mt-3">
        <span className="flex justify-center items-center gap-2 text-red-700 hover:text-red-600 p-2 text-lg font-medium hover:bg-red-100  rounded-lg cursor-pointer">
          Delete Account <FiDelete className=" mt-1 size-6" />
        </span>
        <span className=" flex justify-center items-center gap-2 p-2 text-red-700 hover:text-red-600 text-lg font-medium hover:bg-red-100 rounded-lg cursor-pointer">
          Sign Out <IoMdLogOut className=" mt-1 size-6" />
        </span>
      </div>
      <hr className=" mt-4" />
    </div>
  );
}
