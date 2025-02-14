import { useAuth } from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const handleClick = () => {
    googleSignIn()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={handleClick}
      className="bg-gray-800 text-center text-red-500 font-bold text-3xl py-1"
    >
      G
    </button>
  );
};

export default GoogleLogin;
