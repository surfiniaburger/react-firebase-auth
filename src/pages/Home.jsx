import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../redux/userSlice";
import UpdateProfile from "../components/UpdateProfile";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="flex  flex-col items-center gap-5 mt-5 ">
        <div className="flex items-center gap-3 ">
          {user.photoURL && (
            <img src={user.photoURL} className="w-16 h-16 rounded-full" />
          )}
          <h1 className="text-3xl ">Oturumunuz açıldı {">>>>"}</h1>
          <span className="text-2xl font-semibold text-indigo-700">
            {user.email}
          </span>
        </div>
        <div className="flex gap-10">
          <button
            onClick={handleLogOut}
            className="bg-indigo-500 px-3 py-2 font-semibold text-white rounded-md text-xl hover:bg-indigo-600 cursor-pointer transition hover:scale-95"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="bg-indigo-500 px-3 py-2 font-semibold text-white rounded-md text-xl hover:bg-indigo-600 cursor-pointer transition hover:scale-95"
            >
              E-Posta Onayla
            </button>
          )}
        </div>

        <UpdateProfile />
      </div>
    );
  }

  return (
    <div>
      <Link to="/register">Kayıt ol</Link>
      <Link to="/login">Giriş yap</Link>
    </div>
  );
};

export default Home;
