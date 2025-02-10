import React from "react";
import Header from "../../layouts/Header";
import { Button } from "antd";

export default function PagePosition() {
    return (
        <div>
            <Header />
            <hr />
            <h1>
                Page Position <Button type="primary">Add Position</Button>
            </h1>

            <Tab>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button type="primary">Edit</Button>
                            <Button type="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button type="primary">Edit</Button>
                            <Button type="danger">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Tab>
        </div>
    );
}
