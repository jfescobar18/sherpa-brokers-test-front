import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Alert, Modal, Form, Input, Button, Typography } from 'antd';
import reqwest from "reqwest";
import "./styles.scss";

const ProductListEditable = (props) => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [product, setProduct] = useState({
        CategoryId: 1,
        ProductId: 1,
        ProductName: "",
        ProductPrice: ""
    })
    const [endpoint, setEndpoint] = useState('')

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditProduct = (_product) => {
        setProduct(_product);
        setModalTitle("Edit Product");
        setEndpoint('edit-product')
        setSuccessMessage('Product Edited');
        showModal();
    }

    const handleCreateProduct = (_product) => {
        setProduct(_product);
        setModalTitle("Create Product");
        setEndpoint('add-product');
        setSuccessMessage('Product Created');
        showModal();
    }

    const handleProductRequest = async (values) => {
        try {
            console.log(values);
            const editBody = {
                ProductId: product.ProductId,
                ProductName: values.ProductName,
                CategoryId: values.CategoryId,
                ProductPrice: values.ProductPrice
            }

            const createBody = {
                ProductName: values.ProductName,
                CategoryId: values.CategoryId,
                ProductPrice: values.ProductPrice
            }

            const response = await reqwest({
                url: `${process.env.REACT_APP_API_URL}products/${endpoint}`,
                method: "post",
                type: "json",
                data: endpoint === 'edit-product' ? editBody : createBody,
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            });
            setSuccessAlert(true);
            handleCancel();
            customFetch();
        }
        catch (err) {
            console.log(err);
            setErrorAlert(true);
        }
    };

    const handleDelete = async (ProductId) => {
        try {
            const response = await reqwest({
                url: `${process.env.REACT_APP_API_URL}products/remove-Product`,
                method: "post",
                type: "json",
                data: { ProductId: ProductId },
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            });
            setSuccessAlert(true);
            setSuccessMessage('Product Deleted');
            customFetch();
        }
        catch (err) {
            console.log(err);
            setErrorAlert(true);
        }

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'ProductName',
            key: 'ProductName'
        },
        {
            title: 'Price',
            dataIndex: 'ProductPrice',
            key: 'ProductPrice',
        },
        {
            title: 'Category',
            dataIndex: 'CategoryId',
            key: 'CategoryId',
        },
        {
            title: 'Delete',
            dataIndex: '',
            key: 'x',
            render: (_, record) =>
                products.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.ProductId)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
        {
            title: 'Edit',
            dataIndex: '',
            key: 'x',
            render: (_, record) =>
                products.length >= 1 ? (
                    <Typography.Link onClick={() => handleEditProduct(record)}>Edit</Typography.Link>)
                    : null,
        },
    ];

    const customFetch = async (params = {}) => {
        const response = await reqwest({
            url: `${process.env.REACT_APP_API_URL}products/get-products`,
            method: "get",
            type: "json",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        setProducts(response.products);
    };

    useEffect(() => {
        customFetch({});
    }, []);

    return (
        <React.Fragment>
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
                    description={successMessage}
                    type="success"
                    showIcon
                    closable
                    afterClose={() => setSuccessAlert(false)}
                />
                : null}

            <Modal title={modalTitle} visible={isModalVisible} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleProductRequest}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="ProductName"
                        rules={[{ required: true, message: 'Please input a name!' }]}
                        initialValue={product.ProductName}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="CategoryId"
                        rules={[{ required: true, message: 'Please input an Id!' }]}
                        initialValue={product.CategoryId}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="ProductPrice"
                        rules={[{ required: true, message: 'Please input a price!' }]}
                        initialValue={product.ProductPrice}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table columns={columns} dataSource={products} />

            <Button type="primary" onClick={handleCreateProduct}>
                Add Product
            </Button>
        </React.Fragment>
    )
}

export default ProductListEditable;