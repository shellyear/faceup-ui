import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow-md border-b border-gray-100">
      <Link to="/" className="flex justify-center items-center p-6">
        <img
          src="/faceup-logo.svg"
          width={170}
          height={44}
          alt="logo"
          className="max-w-42 max-h-16"
        />
      </Link>
    </header>
  );
};

export default Header;
