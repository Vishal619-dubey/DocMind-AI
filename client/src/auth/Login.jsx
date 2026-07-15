import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      alert("Login Successful");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">

      <button
        onClick={googleLogin}
        className="bg-indigo-600 px-6 py-4 rounded-xl text-white font-semibold"
      >
        Continue with Google
      </button>

    </div>
  );
}