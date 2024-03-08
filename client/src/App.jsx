import './App.css'
import Users from "./components/Users.jsx";
import {createTheme, ThemeProvider, Typography} from "@mui/material";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import NewUser from "./components/NewUser.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import SendEmail from "./components/SendEmail.jsx";

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            text: {
                primary: '#ffffff'
            }
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Users/>}></Route>
                    <Route path="/new" element={<NewUser/>}></Route>
                    <Route path="/update/:id" element={<UpdateUser/>}></Route>
                    <Route path="/send-email/:ids" element={<SendEmail/>}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
