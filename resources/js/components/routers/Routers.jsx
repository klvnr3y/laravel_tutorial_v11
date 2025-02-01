import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageLogin from "../views/public/PageLogin/PageLogin";
import PageAbout from "../views/public/PageAbout/PageAbout";
import PageUsers from "../views/private/PageUsers/PageUsers";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageLogin />} />

                <Route path="/about" element={<PageAbout />} />

                <Route path="/dashboard" element={<PageDashboard />} />

                <Route path="/users" element={<PageUsers />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById("root")).render(<Routers />);
