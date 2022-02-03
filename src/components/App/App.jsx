import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ProductList } from "../ProductList"
import { Button, Modal, Form, Input } from 'antd';
import reqwest from "reqwest";
import "./styles.scss";

const App = (props) => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        const response = await reqwest({
            url: `${process.env.REACT_APP_API_URL}auth/login`,
            method: "post",
            type: "json",
            data: { AdminUsername: values.AdminUsername, AdminPassword: values.AdminPassword }
        });
        if (response.token !== null) {
            localStorage.setItem("token", response.token);
            navigate('/admin');
        }
    };

    return (
        <React.Fragment>
            <div className='main'>
                <ProductList />

                <Button type="primary" onClick={showModal}>
                    Login
                </Button>

                <Modal title="Login" visible={isModalVisible} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="AdminUsername"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="AdminPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    )
}

export default App;