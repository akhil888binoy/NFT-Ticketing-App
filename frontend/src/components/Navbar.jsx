import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isMobile = window.innerWidth <= 768; // Define mobile condition

  return (
    <header className="header bg-gradient-to-r from-pink-500 to-pink-700 flex justify-between items-center p-4">
  <nav className="flex  font-bold text-lg gap-7 text-white">
    <NavLink to={"/"} className="hover:text-pink-600">
      Home
    </NavLink>
  </nav>

  <nav className="flex  font-bold text-lg gap-7 text-white">
    <NavLink to={"/ticket"} className="hover:text-pink-600">
     Get Tickets
    </NavLink>
    <a href="https://github.com/akhil888binoy" target="_blank" rel="noopener noreferrer" className="text-white  hover:text-pink-500">
      Github link
    </a>
  </nav>
</header>

  );
}

export default Navbar;