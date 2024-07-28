import {useNavigate} from 'react-router-dom';
import {loginSucess} from '../slice/authSlice';
const server = 'http://localhost:3000'
export const getLoginUser = () => async (dispatch) => {
    try{
        const url = `${server}/user`;
        console.log(url);
        const res = await fetch(url, {
            credentials: 'include',
          });
          console.log(res.ok);

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            throw error
        }
        const data = await res.json();
        dispatch(loginSucess(data.data));

    }catch(err){
        console.log(err)
    }
}
