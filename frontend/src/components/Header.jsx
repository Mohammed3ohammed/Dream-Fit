import { RxClipboard, RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";



const Header = () => {

    const { cartItems } = useCart();

  return (
    <header className="head">

      <Link to="/"><h1>Dream Fit</h1></Link>



      <div className="icons">
        <Link to="/user"><RxPerson /></Link>
         <div className="cart-icon-wrapper">
          <Link to="/cart">
            <RxClipboard />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;