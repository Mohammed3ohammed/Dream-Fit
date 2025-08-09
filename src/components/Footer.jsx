
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
<footer>
  <div className="footer-container">
    <h2 className="footer-title">Dream Fit</h2>

    <div className="footer-social">
      <div className="footer-icons">
        <Link to="https://facebook.com" className="facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </Link>
        <Link to="https://instagram.com" className="instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </Link>
        <Link to="https://wa.me/1234567890" className="whatsapp" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </Link>
        <Link to="https://tiktok.com" className="tiktok" target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </Link>
      </div>
      <h2 className="footer-contact">تواصل معنا</h2>
    </div>
  </div>
</footer>
  );
};

export default Footer;
