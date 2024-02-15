import { Link, useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../../utils/jwt";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="absolute right-5">
      {!getToken() ? (
        <Link to="/login">
          <button className="px-5 py-2 text-blue-500 rounded-md">Log In</button>
        </Link>
      ) : (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
