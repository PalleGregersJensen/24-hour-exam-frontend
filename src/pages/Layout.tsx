import { Outlet, NavLink } from "react-router-dom";
import "../css-files/navHeader.css";

const Layout = () => {
    return (
        <>
            <header className="navHeader">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/athletes">Athletes</NavLink>
                <NavLink to="/results">Results</NavLink>
                <NavLink to="/disciplines">Disciplines</NavLink>
            </header>

            <Outlet />
        </>
    );
};

export default Layout;
