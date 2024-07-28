import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginUser } from "../redux/action/authAction";
import { socket } from "../socket";
import { joinedGroup } from "../redux/action/groupAction";
export function GroupsDetails({data}) {
    const [join, setJoin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLoginUser());
    },[dispatch]);
    const {user} =  useSelector(s => s.auth);
    
    function handleJoinGroups(groupId) {
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
        const groupData = {
            username: user.name,
            roomId: groupId,
            color: getRandomColor()
          }
        dispatch(joinedGroup(groupId,navigate,groupData));       
  }
  
    return (
        <div style={{
            background:'yellow',
            padding:"10px",
            margin:'20px 20px',
            width:'50%',
            border:'4px solid black'
        }}>
            <h3>{data.name}</h3>
            <h4>Creator: {data.creator.name}</h4>
            <button style={{
                padding:"4px"
            }}
            onClick={() => handleJoinGroups(data.groupId)}
            >JOIN {data.groupId}</button>
            <h3>Total Member : {data.members.length}</h3>
        </div>
    );
}
