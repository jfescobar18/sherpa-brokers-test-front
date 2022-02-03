import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import reqwest from "reqwest";
import "./styles.scss";

const ProductList = (props) => {
    const [products, setProducts] = useState([])
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
        }
    ];

    const customFetch = async (params = {}) => {
        const response = await reqwest({
            url: `${process.env.REACT_APP_API_URL}products/get-products`,
            method: "get",
            type: "json"
        });
        setProducts(response.products);
    };

    useEffect(() => {
        customFetch({});
    }, []);

    return (
        <React.Fragment>
            <Table columns={columns} dataSource={products} />
        </React.Fragment>
    )
}

export default ProductList;