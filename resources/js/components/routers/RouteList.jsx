import { Routes, Route } from "react-router-dom";

import PageUser from "../views/PageUser/PageUser";
import PageUserForm from "../views/PageUser/PageUserForm";
import PagePosition from "../views/PagePosition/PagePosition";

export default function RouteList() {
    return (
        <Routes>
            <Route path="/" element={<PageUser />} />
            <Route path="/form" element={<PageUserForm />} />
            <Route path="/form/:id" element={<PageUserForm />} />

            <Route path="/position" element={<PagePosition />} />
        </Routes>
    );
}
