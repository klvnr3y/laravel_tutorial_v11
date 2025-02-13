import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../providers/apiUrl";
import { Button, Form, Input, notification } from "antd";

export default function PagePositionForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        console.log("values: ", values);

        setIsLoading(true);

        const data = {
            position: values.position ?? null,
            id: params && params.id ? params.id : null,
        };

        axios
            .post(apiUrl("api/positions"), data)
            .then((response) => {
                if (response.status === 200) {
                    let data = response.data;

                    if (data.success) {
                        if (location.pathname === "/position/form") {
                            navigate(-1);
                        }

                        notification.success({
                            message: "Position",
                            description: data.message,
                        });
                    }
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.log("error", error);

                if (error.response) {
                    notification.error({
                        message: "Position",
                        description: error.response.data.message,
                    });
                } else {
                    notification.error({
                        message: "Position",
                        description: error.message,
                    });
                }
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <h1>Page Position Form</h1>

            <Form onFinish={onFinish}>
                <Form.Item name="position" label="Position">
                    <Input type="text" />
                </Form.Item>

                <Form.Item>
                    <div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
