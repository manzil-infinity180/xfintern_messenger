import {useParams} from 'react-router-dom'
import {getGroupDetails, getAllGroupsMessage} from '../redux/action/groupAction';
import { useDispatch, useSelector } from 'react-redux';
import {getLoginUser} from '../redux/action/authAction';
import { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { socket } from '../socket';
import { GroupMessage } from './GroupMessage';
import { useQueries, useQuery } from '@tanstack/react-query';
import { all_Group_Messages } from '../utils/http';
export function DummyChat() {
    const [allMess, setallMess] = useState([]);
    const dispatch = useDispatch();
    const {groupId} = useParams();
    // // fetch all group message 
    const {data, isSuccess} = useQuery({
      queryKey: ['groupMessage'],
      queryFn: () => all_Group_Messages(groupId)
    });
    

    return (
        <>
        <div id="content_div_ele">
           {
            data && data.map((el) => (
              <GroupMessage data={el} />
            ))
           }
      
        </div>
        </>
    );
}

function dummyMess({data}){
    return <>
    <div
        style={{
            border: "1px solid black",
            padding: "1px 2px 3px",
            margin:'5px 5px'
        }}
        >
            <label
                style={{
                    textDecoration:'underline',
                    color:'blue',
                    margin:'0 0 2px'
                }}
            >{data.sender}</label>
            <h3
                style={{ margin:'0', padding:"0 30px", background:data.color, opacity:'0.90'}}
            >{data.content.text}</h3>
        </div>
    </>
}