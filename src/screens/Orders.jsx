import React, {useContext, useEffect, useState} from 'react';
import {getOrders} from "./requests/getOrders";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {Alert, CircularProgress} from "@mui/material";
import {userStateContext} from "../components/contextComponents/userContext";
import {useNavigate} from "react-router-dom";

const columns = [
    { field: 'id',
      headerName: 'Order ID',
      width: 200,
    },
    {
        field: 'date',
        headerName: 'Order Date',
        width: 300,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Order Price ($)',
        width: 300,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Order Address',
        width: 300,
        editable: true,
    }
]
const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const {token} = useContext(userStateContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function getOrdersGrid(){
        if(loading){
            return (<CircularProgress />)
        } else {
            if(orderDetails.length !== 0){
                return (
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={orderDetails}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                )
            } else{
                return(<span>
                            No orders to display
                        </span>)
            }
        }
    }

    useEffect(() => {
        if(token == undefined){
            navigate("/login");
        }
    },[])

    useEffect(() =>{
        getOrders(token, setOrderDetails, setLoading, setError)
    },[])

    return(
        <div style={{padding: "50px"}}>
            <>
                {error !== "" &&
                    <Alert severity="warning">{error}</Alert>
                }
            </>
            {getOrdersGrid()}
        </div>
    )
}

export default Orders;