import {DataGrid} from '@mui/x-data-grid';
import useFetch from "../useFetch.js";
import {Alert, Button, CircularProgress, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const {data, isLoading, err} = useFetch("/users");
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const [error, setError] = useState(err);

    const columns = [
        {field: 'email', headerName: 'Email', width: 350},
        {field: 'first_name', headerName: 'First Name', width: 200},
        {field: 'last_name', headerName: 'Last Name', width: 200},
        {field: 'sent_emails', headerName: 'Sent Emails', width: 100},
    ];

    const rows = data ? data.map((user) => {
        return {
            id: user._id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            sent_emails: user.mailsSent
        }
    }) : [];

    const onSelectionModelChange = (ids) => {
        const selectedIDs = new Set(ids);
        const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id.toString())
        );

        setSelected(selectedRowData);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete the selected user?")) {
            return fetch("http://localhost:8085/api/users/" + selected[0].id, {
                method: "DELETE",
            }).then((response) => {
                if (response.status !== 200) {
                    response.json().then(data => {
                        setError(new Error(data.message))
                    })
                    console.error('Error:', response)
                } else {
                    window.location.reload();
                }
            });
        }
    };
    return (
        <>
            <div style={{padding: "10px", margin: "20px 0"}} className="d-flex align-self-end justify-content-between">
                <Typography variant="h2" component="h2" color="text.primary">
                    Users
                </Typography>
                <div style={{padding: "10px"}} className="d-flex align-self-end">
                    <Button variant="contained" color="secondary" sx={{ml: 1}}
                            onClick={(e) => navigate("/send-email/" + selected.map((s) => s.id))}
                    disabled={selected.length === 0}>Send Email</Button>
                    <Button variant="contained" sx={{ml: 1}} href="/new">New</Button>
                    <Button variant="outlined" sx={{ml: 1}} disabled={selected.length !== 1}
                            onClick={(e) => navigate("/update/" + selected[0].id)}>Update</Button>
                    <Button variant="outlined" sx={{ml: 1}} color="error" disabled={selected.length !== 1} onClick={handleDelete}>Delete</Button>
                </div>
            </div>
            {error && <Alert severity="error">{error.message}</Alert>}
            {isLoading && <CircularProgress/>}
            {data && <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[20, 50, 100]}
                    checkboxSelection
                    onRowSelectionModelChange={onSelectionModelChange}
                />
            </div>}
        </>
    );
}

export default Users;