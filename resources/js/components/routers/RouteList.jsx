import { Routes, Route } from "react-router-dom";

import PageUser from "../views/PageUser/PageUser";
import PageUserForm from "../views/PageUser/PageUserForm";
import PagePosition from "../views/PagePosition/PagePosition";
import PagePositionForm from "../views/PagePosition/PagePositionForm";
import PageLanguage from "../views/PageLanguage/PageLanguage";

import PageLanguageForm from "../views/PageLanguage/PageLanguageForm";

export default function RouteList() {
    return (
        <Routes>
            <Route path="/" element={<PageUser />} />
            <Route path="/form" element={<PageUserForm />} />
            <Route path="/form/:id" element={<PageUserForm />} />

            <Route path="/position" element={<PagePosition />} />
            <Route path="/position/form" element={<PagePositionForm />} />
            <Route path="/position/form/:id" element={<PagePositionForm />} />

            <Route path="/language" element={<PageLanguage />} />
            <Route path="/language/form" element={<PageLanguageForm />} />
            <Route path="/language/form/:id" element={<PageLanguageForm />} />
        </Routes>
    );
}
