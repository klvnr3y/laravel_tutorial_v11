import { Button, Flex, Table } from "antd";
import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import apiUrl from "../../providers/apiUrl";
import Header from "../../layouts/Header";

export default function PagePosition() {
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const response = await axios.get(apiUrl("api/positions"));

        if (response.status === 200) {
            setDataSource(response.data.data);
        }
    };
    useEffect(() => {
        fetchData();

        return () => {};
    }, []);

    const handleDelete = (position) => {
        axios
            .delete(apiUrl("api/positions/" + position.id))
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
            <Button type="primary" onClick={() => navigate("/position/form")}>
                Add Position
            </Button>
            <hr />
            <h1>Page Position</h1>

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
                                    onClick={() =>
                                        navigate("/position/form/" + record.id)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(record)}
                                    danger
                                >
                                    Delete
                                </Button>
                            </Flex>
                        ),
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
                    {
                        title: "Salary",
                        dataIndex: "salary",
                        key: "salary",
                    },
                ]}
            />
        </div>
    );
}
