import {useParams} from 'react-router-dom'
import {getGroupDetails} from '../redux/action/groupAction';
import { useDispatch, useSelector } from 'react-redux';
import {getLoginUser} from '../redux/action/authAction';
import { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { socket } from '../socket';
export function GroupChat() {
  const [chat, setChat] = useState([]);
    const {groupId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGroupDetails(groupId));
        dispatch(getLoginUser());
    },[dispatch]);
    const {group} = useSelector(s => s.group);
    const {user} = useSelector(s => s.auth);

    useEffect(() => {
      socket.on('room_server_message', (data) => {
          setChat((chat) => [...chat, data]);
          console.log(chat);
      });
      return () => socket.off('room_server_message');
  },[socket]);
    return (
        <>
          {
            (group && user) && <>
            <h1>{group.name}</h1> 
            <h5>{group.groupId}</h5>
           { chat && <Chat username={user.name} roomId={group.groupId} color={'blue'}/>}
           </>
        }
        </>
    );
}
