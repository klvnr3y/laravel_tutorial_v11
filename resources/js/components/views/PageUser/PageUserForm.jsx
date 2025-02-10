import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../providers/apiUrl";
import { Button, Form, Input } from "antd";

export default function PageUserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (params && params.id) {
                const response = await axios.get(
                    apiUrl("api/users/" + params.id)
                );

                console.log("response: ", response);

                if (response.status === 200) {
                    const data = response.data.data;

                    const formData = document.forms[0];
                    console.log("formData: ", formData);

                    formData.name.value = data.name;
                    formData.email.value = data.email;
                }
            }
        };

        fetchData();

        return () => {};
    }, [params]);

    const onFinish = (values) => {
        console.log("values: ", values);

        setIsLoading(true);

        const data = {
            name: values.name ?? null,
            email: values.email ?? null,
            password: values.password ?? null,
            id: params && params.id ? params.id : null,
        };

        axios
            .post(apiUrl("api/users"), data)
            .then((response) => {
                if (response.status === 200) {
                    let data = response.data;

                    if (data.success) {
                        alert(data.message);
                        if (location.pathname === "/form") {
                            navigate(-1);
                        }
                    } else {
                        alert(data.message);
                    }
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.log("error", error);

                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert(error.message);
                }

                setIsLoading(false);
            });
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>PageUserForm</h1>

            <Form onFinish={onFinish}>
                <Form.Item name="name" label="Name">
                    <Input type="text" />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input type="password" />
                </Form.Item>
                <div>
                    <Button htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}
