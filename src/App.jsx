import { useState } from "react";
import { register } from "./firebase";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    console.log(user);
  };
  return (
    <div className="App">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-posta adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button disabled={!email || !password} type="submit">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default App;
