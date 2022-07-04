import React, { useEffect, useState, useContext } from "react";
import {getUserInfo} from "./requests/getUserInfo";
import {CircularProgress, Button, Divider, List, ListItem, TextField, Typography} from "@mui/material";
import {updateUsersData} from "./requests/updateUsersData";
import {userStateContext} from "../components/contextComponents/userContext";
import {useNavigate} from "react-router-dom";


export default function UserScreen() {
    const navigate = useNavigate();
    const {token} = useContext(userStateContext);
    const [loading, setLoading] = useState(false)
    const [, setError] = useState("");
    const [userInfo, setUserInfo] = useState(undefined);
    const [editForm, setEditForm] = useState(false)
    const [street, setStreet] = useState("");
    const [postCode, setPostCode] = useState("");
    const [city, setCity] = useState("");
    const [apartment, setApartment] = useState("");
    const [saveDisabled, setSaveBtnDisabled] = useState(false)



    useEffect(() => {
        if(token == undefined){
            navigate("/login");
        }
        getUserInfo(setLoading, setUserInfo, token, setError)
    },[])

    useEffect(() => {
        if(street == "" || postCode == "" || city=="" || apartment==""){
            setSaveBtnDisabled(true)
        }else{
            setSaveBtnDisabled(false)
        }
    },[street, postCode, city, apartment])

    const handleChangeData = () => {
        const updatedData = {
            name: userInfo.name,
            street: street,
            city: city,
            apartment: apartment,
            postCode: postCode
        }
        updateUsersData(updatedData, token, setLoading, setUserInfo, setError);
        setEditForm(false);
    }

    function getListItem(type, typeName){
        if(type && !editForm){
            return(
                <>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start"
                              style={{padding: "20px", flexDirection: "column"}}
                    >
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            {typeName}
                        </Typography>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="p"
                            color="text.primary"
                        >
                            {type}
                        </Typography>
                    </ListItem>
                </>
            )
        } else {
            return(
                <ListItem alignItems="flex-start"
                          style={{padding: "20px", flexDirection: "column"}}
                >
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                    >
                        {typeName}
                    </Typography>
                </ListItem>)
        }
    }

    function renderUserInfo() {
        if(userInfo !== undefined){
            return(
                <>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start"
                                  style={{padding: "20px", flexDirection: "column"}}
                        >
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h6"
                                color="text.primary"
                            >
                                Name
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="p"
                                color="text.primary"
                            >
                                {userInfo.name}
                            </Typography>
                        </ListItem>
                        {getListItem(userInfo.street, "Street")}
                        <div>
                            {editForm &&
                                <TextField
                                    data-test-id="streetInput"
                                    id="filled-basic"
                                    style={{padding: "20px"}}
                                    onChange={(e) => setStreet(e.target.value)}
                                />

                            }
                        </div>

                        {getListItem(userInfo.apartmentNo, "Apartment Number")}
                        <div>
                            {editForm &&
                                <TextField
                                    data-test-id="apartmentInput"
                                    id="filled-basic"
                                    style={{padding: "20px"}}
                                    onChange={(e) => setApartment(e.target.value)}
                                />

                            }
                        </div>
                        {getListItem(userInfo.postCode, "Post code")}
                        <div>
                            {editForm &&
                                <TextField
                                    data-test-id="postCodeInput"
                                    id="filled-basic"
                                    style={{padding: "20px"}}
                                    onChange={(e) => setPostCode(e.target.value)}
                                />

                            }
                        </div>
                        {getListItem(userInfo.city, "City")}
                        <div>
                            {editForm &&
                                <TextField
                                    data-test-id="cityInput"
                                    id="filled-basic"
                                    style={{padding: "20px"}}
                                    onChange={(e) => setCity(e.target.value)}
                                />

                            }
                        </div>
                    </List>
                    <div>
                        <Button data-test-id="saveFromBtn" style={{color: "white", padding: "10px 20px", backgroundColor: "#557C55"}} disabled={saveDisabled || !editForm} onClick={handleChangeData}>Save changes</Button>
                        <Button data-test-id="editFormBtn" style={{color: "#557C55"}} onClick={() => setEditForm(!editForm)}>Edit data</Button>
                    </div>

                </>
            )
        } else {
            return(
                <>
                    Access expired, log in
                </>
            )
        }
    }

    return (
        <div>
            {loading ?
                <CircularProgress/>
                :
                <div style={{padding: "50px"}}>
                    {renderUserInfo()}
                </div>
            }
        </div>
    );
}