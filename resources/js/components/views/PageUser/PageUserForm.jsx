import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../providers/apiUrl";
import { Button, Form, Input, Select } from "antd";

export default function PageUserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [positions, setPosition] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apiUrl("api/positions"));

            if (response.status === 200) {
                setPosition(response.data.data);
            }
        };

        fetchData();

        return () => {};
    }, []);

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
            <Button onClick={() => navigate(-1)}>Back</Button>
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

                <Select
                    placeholder="Select a Position"
                    style={{ width: "100%" }}
                >
                    {positions.map((position) => (
                        <Select.Option key={position.id} value={position.id}>
                            {position.position}
                        </Select.Option>
                    ))}
                </Select>

                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}
