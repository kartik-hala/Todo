import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase-admin/config";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      console.log("User ID:", userCredential.user.uid);
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white rounded p-2">
        Login
      </button>
    </div>
  );
};

export default Login;
