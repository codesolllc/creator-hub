import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = ({ action }) => {
  return (
    <>
      <button className="google_auth_btn  mb-3" onClick={action}>
        <FcGoogle className="google_icon me-2"  />{" "}
        Signup with Google
      </button>
    </>
  );
};

export default GoogleAuthButton;
