import {Alert, Button, FormLabel, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../useFetch.js";

const NewUser = () => {
    const routeParams = useParams();

    const [email, setEmail] = useState( "")
    const [firstName, setFirstName] = useState( "")
    const [lastName, setLastName] = useState( "")
    const [emailError, setEmailError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8085/api/users/" + routeParams.id);
            const data = await response.json();
            console.log("Data: ", data);
            if (response.status !== 200) {
                console.log("Error fetching data: ", response.status, response.json());
                throw new Error(data.message);
            }

            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        };
        fetchData()
            .catch((e) => {
                console.error(e);
                setError(e);
                setIsPending(false);
            });
    }, [routeParams.id]);

    const handleSubmit = (event) => {
        event.preventDefault()
        const user = {email, firstName, lastName}

        setIsPending(true)
        fetch('http://localhost:8085/api/users/' + routeParams.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then((response) => {
            setIsPending(false)
            if (response.status !== 200) {
                response.json().then(data => {
                    setError(data.error)
                })
                console.error('Error:', response)
            } else {
                navigate('/')
                console.log('new user added')
            }
        })
    }

    return (
        <div style={{marginTop: "100px"}}>
            <Typography variant="h4">
                New User
            </Typography>
            {error && <Alert severity="error" sx={{my: 3}}>{error}</Alert>}
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                    placeholder="mail@example.com"
                />
                <TextField
                    label="Fisrt Name"
                    onChange={e => setFirstName(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={firstName}
                    error={firstNameError}
                    placeholder="Jonh"
                />
                <TextField
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    required
                    variant="outlined"
                    color="primary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={lastName}
                    error={lastNameError}
                    placeholder="Doe"
                />

                <div className="d-flex justify-content-center">
                    <Button variant="contained" color="primary" sx={{mx: 1}} type="submit" disabled={!isPending}>Update</Button>
                    <Button variant="outlined" color="primary" sx={{mx: 1}} href="/">Back</Button>
                </div>
            </form>
        </div>
    );
}

export default NewUser;