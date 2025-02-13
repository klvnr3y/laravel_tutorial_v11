import { Button, Flex, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import apiUrl from "../../providers/apiUrl";
import axios from "axios";
import dayjs from "dayjs";

export default function PageLanguage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        const response = await axios.get(apiUrl("api/languages"));

        if (response.status === 200) {
            setDataSource(response.data.data);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {};
    }, []);

    const handleDelete = (language) => {
        axios
            .delete(apiUrl("api/languages/" + language.id))
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
            });
    };

    return (
        <div>
            <Header />
            <Button type="primary" onClick={() => navigate("/language/form")}>
                Add Language
            </Button>
            <hr />
            <h1>Page Language</h1>

            <Table
                rowKey={(record) => record.id}
                dataSource={dataSource}
                columns={[
                    {
                        title: "Action",
                        key: "action",
                        render: (text, record) => (
                            <Flex gap={2}>
                                <Button
                                    onClick={() =>
                                        navigate("/language/form/" + record.id)
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(record)}
                                    loading={isLoading}
                                    danger
                                >
                                    Delete
                                </Button>
                            </Flex>
                        ),
                    },
                    {
                        title: "Language",
                        dataIndex: "language",
                        key: "language",
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
