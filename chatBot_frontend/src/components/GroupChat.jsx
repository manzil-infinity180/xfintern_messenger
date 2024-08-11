import {useNavigate, useParams} from 'react-router-dom'
import {getGroupDetails, getAllGroupsMessage} from '../redux/action/groupAction';
import { useDispatch, useSelector } from 'react-redux';
import {getLoginUser} from '../redux/action/authAction';
import { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { socket } from '../socket';
import { GroupMessage } from './GroupMessage';
import { useQueries, useQuery } from '@tanstack/react-query';
import { all_Group_Messages } from '../utils/http';
export function GroupChat() {
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();
    const {groupId} = useParams();
    const dispatch = useDispatch();
    // // fetch all group message 
    const {data: groupMessage} = useQuery({
      queryKey: ['groupMessage', groupId],
      queryFn: () => all_Group_Messages(groupId)
    });
    useEffect(() => {
        dispatch(getGroupDetails(groupId));
        dispatch(getLoginUser());
        dispatch(getAllGroupsMessage(groupId));
    },[dispatch]);
    let {group, 
      allMessage
    } = useSelector(s => s.group);
    // console.log(allMessage);
    const {user} = useSelector(s => s.auth);

    useEffect(() => {
      socket.on('room_server_message', (data) => {
          setChat((chat) => [...chat, data]);
          console.log(chat);
      });
      return () => socket.off('room_server_message');
  },[socket]);
    return (
        <div id="content_div_ele">
          {
            (group && user) && <>
            <h1>{group.name}</h1> 
            <h5>{group.groupId}</h5>
            <button
            style={{
              top:'50px',
              position:'absolute',
              right:'20px',
              padding:'10px'
            }}
            onClick={() => navigate(`/call/${groupId}`)}
            >☎️ Call Me</button>
           {
            groupMessage && groupMessage.map((el) => (
              <GroupMessage data={el} key={el._id} />
            ))
           }
            { chat && <Chat username={user.name} roomId={group.groupId} color={'blue'}/>}
           </>
        }
        </div>
    );
}
