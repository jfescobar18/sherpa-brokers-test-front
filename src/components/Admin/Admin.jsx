import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ProductListEditable } from "../ProductListEditable"
import { Button, Modal, Form, Input, Alert } from 'antd';
import reqwest from "reqwest";
import "./styles.scss";

const App = (props) => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate('/');
        }
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        try {
            const response = await reqwest({
                url: `${process.env.REACT_APP_API_URL}auth/add-admin`,
                method: "post",
                type: "json",
                data: { AdminUsername: values.AdminUsername, AdminPassword: values.AdminPassword },
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            });
            setIsModalVisible(false);
            setSuccessAlert(true);
        }
        catch (err) {
            console.log(err);
            setIsModalVisible(false);
            setErrorAlert(true);
        }
    };

    return (
        <React.Fragment>
            <div className='main'>

                {errorAlert ?
                    <Alert
                        message="Error"
                        description="Something has been wrong"
                        type="error"
                        showIcon
                        closable
                        afterClose={() => setErrorAlert(false)}
                    />
                    : null}

                {successAlert ?
                    <Alert
                        message="Success"
                        description="Admin created"
                        type="success"
                        showIcon
                        closable
                        afterClose={() => setSuccessAlert(false)}
                    />
                    : null}

                <ProductListEditable />

                <Button type="primary" onClick={showModal}>
                    Add Admin
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