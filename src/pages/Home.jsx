import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/register">Kayıt ol</Link>
      <Link to="/login">Giriş yap</Link>
    </div>
  );
};

export default Home;
