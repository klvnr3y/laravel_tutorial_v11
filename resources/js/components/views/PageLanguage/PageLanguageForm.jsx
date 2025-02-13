import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../providers/apiUrl";
import { Button, Form, Input } from "antd";

export default function PageLanguageForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (params && params.id) {
                const response = await axios.get(
                    apiUrl("api/languages/" + params.id)
                );

                console.log("response: ", response);

                if (response.status === 200) {
                    const data = response.data.data;

                    const formData = document.forms[0];
                    console.log("formData: ", formData);

                    formData.position.value = data.position;
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
            language: values.language ?? null,
            id: params && params.id ? params.id : null,
        };

        axios
            .post(apiUrl("api/languages"), data)
            .then((response) => {
                if (response.status === 200) {
                    let data = response.data;

                    if (data.success) {
                        alert(data.message);
                        if (location.pathname === "/language") {
                            navigate(-1);
                        } else {
                            alert(data.message);
                        }
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
            <Button type="  " onClick={() => navigate(-1)}>
                Back
            </Button>
            <h1>Page Language</h1>
            <hr />

            <Form onFinish={onFinish}>
                <Form.Item name="language" label="Language">
                    <Input type="text" name="language" />
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
