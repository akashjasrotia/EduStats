import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useThemeStore } from "../stores/ThemeStore";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";

export default function Login() {
  const darkMode = useThemeStore((s) => s.darkMode);

  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const login = useIsLoggedIn((s) => s.login);
  const user = useIsLoggedIn((s) => s.user);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponseData(data);
      if (res.ok) {
        toast.success("Login Successful!");
        login(data.user);
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error(data.message || "Login Failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("state changed: ", isLoggedIn);
    console.log("user: ", user);
  }, [isLoggedIn, user]);

  return (
    <div
      className={`transition-all duration-300 flex w-full items-center justify-center min-h-screen ${
        darkMode ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div
        className={`shadow-xl rounded-2xl p-8 w-full max-w-md ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Login
        </h2>
        <p
          className={`text-center text-sm mt-2 mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Hi, Welcome back 👋
        </p>

        <a
          href="http://localhost:3000/api/auth/google"
          className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border transition-all duration-200 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              : "bg-white border-gray-300 text-black hover:bg-gray-50"
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-.138-2.65-.389-3.917z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.657-11.303-8.666l-6.571,4.82C9.656,39.663,16.318,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C39.99,36.636,44,30.823,44,24C44,22.659,43.862,21.34,43.611,20.083z"
            ></path>
          </svg>
          Login with Google
        </a>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div
            className={`grow border-t ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          ></div>
          <span
            className={`mx-4 text-sm ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            or Login with Email
          </span>
          <div
            className={`grow border-t ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          ></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className={`block font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
              placeholder="E.g. johndoe@email.com"
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none transition-colors duration-200 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-mainBlue"
                  : "bg-white border-gray-300 text-black placeholder:text-gray-400 focus:ring-mainBlue"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none transition-colors duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-mainBlue"
                    : "bg-white border-gray-300 text-black placeholder:text-gray-400 focus:ring-mainBlue"
                }`}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={`absolute inset-y-0 right-3 flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-mainBlue"
                    : "border-gray-300 text-mainBlue"
                } focus:ring-mainBlue`}
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 block text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Remember Me
              </label>
            </div>
            <a
              href="#"
              className={`text-sm font-medium hover:underline ${
                darkMode
                  ? "text-mainBlue hover:text-mainBlue/90"
                  : "text-mainBlue hover:text-mainBlue/90"
              }`}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full font-medium py-2.5 rounded-lg transition-all duration-200
              bg-mainBlue text-white hover:bg-mainBlue/90
            `}
          >
            Login
          </button>
        </form>

        <p
          className={`text-center text-sm mt-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Not registered yet?{" "}
          <NavLink
            to="/signup"
            className={`font-medium hover:underline inline-flex items-center gap-1 ${
              darkMode
                ? "text-mainBlue hover:text-mainBlue/90"
                : "text-mainBlue hover:text-mainBlue/90"
            }`}
          >
            Create an account
            <ArrowUpRight size={16} />
          </NavLink>
        </p>
      </div>
    </div>
  );
}
