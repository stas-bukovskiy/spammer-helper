import {Alert, Button, FormLabel, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const NewUser = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const user = {email, firstName, lastName}

        setIsPending(true)
        fetch('http://localhost:8085/api/users/', {
            method: 'POST',
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
                    <Button variant="contained" color="primary" sx={{mx: 1}} type="submit" disabled={isPending}>Create</Button>
                    <Button variant="outlined" color="primary" sx={{mx: 1}} href="/">Back</Button>
                </div>
            </form>
        </div>
    );
}

export default NewUser;