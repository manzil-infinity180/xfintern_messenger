import {getLoginUser} from '../redux/action/authAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
export function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getLoginUser());
    },[]);
    const selector = useSelector(s => s.auth);
    const {user} =  selector;
    function handleJoinGroups(groupId) {
          const data = {
            username: user.name,
            roomId: groupId,
            color: 'yellow'
          }
          socket.emit('join_room', data);
          navigate(`/group/${groupId}`);
    }
    return (
        <div>
            {
             user && <>
             <img src={user.picture} />
             <h3>
                {user.name}
             </h3>
             <h3>Groups Owner</h3>
             {
                user.groupOwner.map((el) => (
                    <>
                    <h4>{el.name}</h4>
                    <button onClick={() => handleJoinGroups(el.groupId)}>JOIN {el.groupId}</button> 
                    </>
                ))
             }
             </>
            }
        </div>
    );
}