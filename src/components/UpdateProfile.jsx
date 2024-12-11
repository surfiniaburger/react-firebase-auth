import { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [displayname, setDisplayName] = useState(user.displayname || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayname,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="min-w-96 mx-auto grid gap-y-4 py-4 mt-20"
      >
        <h1 className="text-2xl bg-indigo-400 rounded-md text-center py-1 bg-opacity-80">
          Profile
        </h1>
        <div>
          <label className="block font-medium text-gray-800 text-xl">
            Full Name
          </label>
          <div className="my-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
              placeholder="Davinson Sanches"
              value={displayname}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-800 text-xl">
            Photo
          </label>
          <div className="my-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
              placeholder="Davinson Sanches"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex disabled:opacity-40 items-center justify-center px-4 py-2 border border-transparent bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-indigo-500 text-white font-medium"
        >
          Update
        </button>
      </form>
      <form
        onSubmit={handleResetSubmit}
        className="min-w-96 mx-auto grid gap-y-4 py-4 mt-10"
      >
        <h1 className="text-2xl bg-gray-500 text-white rounded-md text-center py-1 bg-opacity-80">
          Update Password
        </h1>
        <div>
          <label className="block font-medium text-gray-800 text-xl">
            New Password
          </label>
          <div className="my-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-900 rounded-md"
              placeholder="Enter your new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!password}
          className="inline-flex disabled:opacity-40 items-center justify-center px-4 py-2 border border-transparent bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 focus:ring-indigo-500 text-white font-medium"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;