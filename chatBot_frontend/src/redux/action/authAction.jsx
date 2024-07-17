import {useNavigate} from 'react-router-dom';

const server = 'http://localhost:3000/'
export const getAuth = () => async (dispatch) => {
    try{
        const url = `${server}/auth/google`;
        const data = await fetch(url);

    }catch(err){
        console.log(err)
    }
}