import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Users</Link>
                </li>
                <li>
                    <Link to="/position">Position</Link>
                </li>
                <li>
                    <Link to="/language">Language</Link>
                </li>
            </ul>
        </nav>
    );
}
