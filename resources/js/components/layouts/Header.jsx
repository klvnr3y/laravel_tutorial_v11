import { Link } from "react-router-dom";
import { Layout } from "antd";

export default function Header() {
    return (
        <Layout.Header
            style={{
                backgroundColor: "#fff",
                color: "#000",
            }}
        >
            <ul style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </Layout.Header>
    );
}
