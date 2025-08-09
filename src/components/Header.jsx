import { RxClipboard, RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="head">

      <h1>Dream Fit</h1>

      <div className="icons">
        <Link to="/user"><RxPerson /></Link>
        <Link to="/cart"><RxClipboard /></Link>
      </div>
    </header>
  );
};

export default Header;