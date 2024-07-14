import {useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
export function ErrorPage(){
    const navigate = useNavigate();

    return <>
    <h1>Navigate to home Page, something went wrong</h1>
        <button onClick={() => navigate('/')}>Click me</button>
    </>
}