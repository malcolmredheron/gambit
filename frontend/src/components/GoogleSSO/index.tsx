import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { userAPIs } from "../../api/user";
import { setToken } from "../../utils/jwt";

const clientId =
  "750051360582-54g28b0j629h4fnpcrb2cj64ma4nltuh.apps.googleusercontent.com";

const GoogleSSO = () => {
  const navigate = useNavigate();

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  const googleSuccess = async (res: any) => {
    const resp = await userAPIs.loginOrRegisterWithGoogle({ token: res.tokenId });
    setToken(resp.data.token);
    navigate("/");
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleSSO;
