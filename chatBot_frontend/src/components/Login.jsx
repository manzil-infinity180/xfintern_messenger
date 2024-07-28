import {useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
export function Login(){
    const navigate = useNavigate();
    const url = `http://localhost:3000/auth/google`
    return <>
        <button onClick={() => window.open(url,"_self")}>Login Google</button>
    </>
}