import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";

import apiUrl from "../../providers/apiUrl";
import Header from "../../layouts/Header";

export default function PageUser() {
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const response = await axios.get(apiUrl("api/users"));

        if (response.status === 200) {
            setDataSource(response.data.data);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {};
    }, []);

    const handleDelete = (user) => {
        axios
            .delete(apiUrl("api/users/" + user.id))
            .then((response) => {
                if (response.status === 200) {
                    let data = response.data;

                    if (data.success) {
                        fetchData();
                        alert(data.message);
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
            <Header />
            <hr />
            <Button type="primary" onClick={() => navigate("/form")}>
                Create User
            </Button>
            <hr />
            <h1>PageUsers</h1>

            <Table
                rowKey={(record) => record.id}
                dataSource={dataSource}
                columns={[
                    {
                        title: "Action",
                        key: "Action",
                        render: (text, record) => (
                            <Flex gap={2}>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        navigate("/form/" + record.id)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    onClick={() => handleDelete(record)}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        ),
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                    },
                    {
                        title: "Position",
                        dataIndex: "position",
                        key: "position",
                    },
                    {
                        title: "Created At",
                        dataIndex: "created_at",
                        key: "created_at",
                        render: (text, _) =>
                            text ? dayjs(text).format("DD/MM/YYYY") : null,
                    },
                ]}
            />
        </div>
    );
}
