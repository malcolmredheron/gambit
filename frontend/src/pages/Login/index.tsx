import { useEffect, useState } from "react";
import GoogleSSO from "../../components/GoogleSSO";
import { gapi } from "gapi-script";
import { Link, useNavigate } from "react-router-dom";
import { userAPIs } from "../../api/user";
import { setToken } from "../../utils/jwt";
import { setUser } from "../../utils/auth";

const clientId =
  "750051360582-54g28b0j629h4fnpcrb2cj64ma4nltuh.apps.googleusercontent.com";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await userAPIs.login(formData);
      if (response.data.success === true) {
        setUser(response.data.user);
        setToken(response.data.token);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error: any) {
      alert(error.response.data.errMessage);
      console.error(error);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 text-blue-500">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>

      <GoogleSSO />

      <p className="text-gray-500 mb-2">New user?</p>
      <Link to="/signup" className="text-blue-500">
        Register
      </Link>
    </div>
  );
}
