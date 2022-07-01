import React, {useContext, useEffect, useState} from 'react';
import {getOrders} from "./requests/getOrders";
import Cookies from "js-cookie";
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
            {
                loading ?
                    <CircularProgress />
                    :<>
                    { orderDetails.length !== 0 ?
                            <Box sx={{ height: 600, width: '100%' }}>
                            <DataGrid
                            rows={orderDetails}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            />
                            </Box>
                        :
                        <span>
                            No orders to display
                        </span>
                    }
                    </>

            }
        </div>
    )
}

export default Orders;