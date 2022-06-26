import React, { useEffect, useState } from "react";
import {getUserInfo} from "./requests/getUserInfo";
import Cookies from "js-cookie";
import {CircularProgress, Button, Divider, IconButton, List, ListItem, TextField, Typography} from "@mui/material";
import {updateUsersData} from "./requests/updateUsersData";


export default function UserScreen() {
    const token = Cookies.get("jwt-token");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState(undefined);

    const [editForm, setEditForm] = useState(false)

    const [street, setStreet] = useState("");
    const [postCode, setPostCode] = useState("");
    const [city, setCity] = useState("");
    const [apartment, setApartment] = useState("");

    const [saveDisabled, setSaveBtnDisabled] = useState(false)



    useEffect(() => {
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
        updateUsersData(userInfo.name, street, city, apartment, postCode, token, setLoading, setUserInfo, setError);
        setEditForm(false);
    }

    return (
        <div>
            {loading ?
                <CircularProgress/>
                :
                <div style={{padding: "50px"}}>
                    {userInfo !== undefined ?
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



                            {(userInfo.street && !editForm) ?
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
                                            Street
                                        </Typography>
                                    <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="p"
                                    color="text.primary"
                                    >
                                {userInfo.street}
                                    </Typography>
                                    </ListItem>
                                </> :
                                <>
                                    <ListItem alignItems="flex-start"
                                              style={{padding: "20px", flexDirection: "column"}}
                                             >
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            Street
                                        </Typography>
                                    </ListItem>

                                </>
                            }
                            <div>
                                {editForm &&
                                    <TextField
                                        id="filled-basic"
                                        style={{padding: "20px"}}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />

                                }
                            </div>

                            {(userInfo.apartment_no && !editForm) ?
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
                                            Apartment Number
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="p"
                                            color="text.primary"
                                        >
                                            {userInfo.apartment_no}
                                        </Typography>
                                    </ListItem>
                                </>:
                                <>

                                    <ListItem alignItems="flex-start"
                                              style={{padding: "20px"}}
                                    >
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            Apartment Number
                                        </Typography>
                                    </ListItem>

                                </>

                            }
                            <div>
                                {editForm &&
                                    <TextField
                                        id="filled-basic"
                                        style={{padding: "20px"}}
                                        onChange={(e) => setApartment(e.target.value)}
                                    />

                                }
                            </div>
                            {(userInfo.post_code && !editForm) ?
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
                                        Post code
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="p"
                                        color="text.primary"
                                    >
                                        {userInfo.post_code}
                                    </Typography>
                                </ListItem>
                            </> :
                                <>

                                    <ListItem alignItems="flex-start"
                                              style={{padding: "20px", flexDirection: "column"}}>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            Post code
                                        </Typography>
                                    </ListItem>

                                </>
                            }
                            <div>
                                {editForm &&
                                    <TextField
                                        id="filled-basic"
                                        style={{padding: "20px"}}
                                        onChange={(e) => setPostCode(e.target.value)}
                                    />

                                }
                            </div>
                            {(userInfo.city && !editForm) ?
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
                                           City
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="p"
                                            color="text.primary"
                                        >
                                            {userInfo.city}
                                        </Typography>
                                    </ListItem>
                                </>
                                :
                                <>

                                    <ListItem alignItems="flex-start"
                                              style={{padding: "20px", flexDirection: "column", justifyContent: "space-between"}}>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                        >
                                            City
                                        </Typography>
                                    </ListItem>

                                </>
                            }
                            <div>
                                {editForm &&
                                    <TextField
                                        id="filled-basic"
                                        style={{padding: "20px"}}
                                        onChange={(e) => setCity(e.target.value)}
                                    />

                                }
                            </div>
                        </List>
                            <div>
                                <Button disabled={saveDisabled || !editForm} onClick={handleChangeData}>Save changes</Button>
                                <Button onClick={() => setEditForm(!editForm)}>Edit data</Button>
                            </div>

                        </>
                        :
                        <>
                        Log in
                        </>
                    }
                </div>
            }
        </div>
    );
}