import "../App.css"; // Correct relative path
import logo from "../assets/logo.png"; // Adjust the path based on where your logo is located

function Topbar() {
  return (
    <header className="topbar">
      <img src={logo} alt="Logo" className="logo-image" />
      <h2 className="logo">Faculty Of Computing</h2>
    </header>
  );
}

export default Topbar;
