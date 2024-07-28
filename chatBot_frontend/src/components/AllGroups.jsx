import {getAllGroupsDetails}  from '../redux/action/groupAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GroupsDetails } from './GroupsDetails';
export function AllGroups() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllGroupsDetails());
    }, [dispatch]);

    const selector = useSelector(s => s.group);
    console.log(selector);
    return (
        <div>
            <h1>All groups are listed here : </h1>
            {
                selector.allGroup && 
                selector.allGroup.map((el) => (
                    <GroupsDetails data={el} />
                ))
            }
        </div>
    );
}
