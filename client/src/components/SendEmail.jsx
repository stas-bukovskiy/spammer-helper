import {Alert, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {FormControl} from "@mui/base";
import {useNavigate, useParams} from "react-router-dom";


const SendEmail = () => {
    const templates = {
        "Welcome Email": `SSubject: Welcome to [Service Name]!

Hi [First Name],

We're thrilled to have you on board! Thanks for joining [Service Name]. If you have any questions or need assistance, feel free to reach out.

Best regards,
The [Service Name] Team
`,
        "Confirmation Email": `Subject: Your [Action] is Confirmed

Hi [First Name],

We've successfully received your [action, e.g., order, registration, etc.]. Here are the details:

[Details of the action]

If you have any questions, please don't hesitate to contact us.

Best regards,
The [Company Name] Team
`,
        "Reminder Email": `Subject: Reminder: [Event/Deadline] Coming Up

Hi [First Name],

Just a friendly reminder that [event/deadline] is coming up on [date]. If you have any last-minute questions or concerns, we're here to help.

Best regards,
The [Company Name] Team
`,
        "Thank You Email": `Subject: Thank You for [Reason]

Hi [First Name],

We just wanted to say a big thank you for [reason, e.g., your purchase, your feedback, etc.]. Your support means a lot to us!

Best regards,
The [Company Name] Team
`,
        "Follow-Up Email": `Subject: Follow-Up on [Topic]

Hi [First Name],

I hope this message finds you well. I'm just following up on [topic]. If you have any questions or would like to discuss further, please don't hesitate to reach out.

Best regards,
[Your Name]
`,
        "Custom": ""
    }

    const params = useParams()
    const navigate = useNavigate()

    const [templateName, setTemplateName] = useState("Custom");
    const [template, setTemplate] = useState("");
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        setTemplateName(event.target.value);
        setTemplate(templates[event.target.value])
    };


    const handleSend = () => {
        const body = {
            ids: params.ids,
            mail: template,
        }

        fetch("http://localhost:8085/api/users/send",
            {method: 'POST',
            headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)})
            .then((response) => {
                if (response.status !== 200) {
                    response.json()
                        .then((error)=> setError(error.error))
                } else {
                    navigate("/");
                }
            })
    };

    return <>
        <div style={{padding: "10px", margin: "20px 0"}} className="d-flex align-self-end justify-content-between">
            <Typography variant="h2" component="h2" color="text.primary">
                Send Email
            </Typography>
            <div style={{padding: "10px"}} className="d-flex align-self-end">
                <Button variant="contained" color="secondary" sx={{ml: 1}}
                        disabled={template.length===0} onClick={handleSend}>Send</Button>
            </div>
        </div>
        {error && <Alert severity="error" sx={{my: 3}}>{error}</Alert>}
        <div style={{padding: "10px"}} className="d-flex align-self-end justify-content-between">
            <FormControl component="fieldset">
                <FormLabel component="legend">Choose a Template</FormLabel>
                <RadioGroup
                    aria-label="options"
                    name="options"
                    value={templateName}
                    onChange={handleChange}
                >
                    {Object.keys(templates).map((key, v) => {
                        return <FormControlLabel value={key} control={<Radio/>} label={key}/>
                    })}
                </RadioGroup>
            </FormControl>
            <TextField
                sx={{width: "75%"}}
                id="outlined-textarea"
                onChange={(e) => setTemplate(e.target.value)}
                value={template}
                multiline
                variant="outlined"
            />
        </div>
    </>
}

export default SendEmail;