import {createSlice} from '@reduxjs/toolkit'

const initialGroupState = {
    isAuthenticated: false,
    loading: false,
    group: null,
    eligible: false,

};

const groupSlice = createSlice({
    name:"groupSlice",
    initialState: initialGroupState,
    reducers:{
        groupDetails : (state,action) => {
        state.group = action.payload;
        },
        allGroupsDetails : (state,action) => {
            state.allGroup = action.payload;
        },
        joinedGroupDetails : (state, action) => {
            state.joined = action.payload;
        },
        allGroupsMessage : (state, action) => {
            state.allMessage = action.payload;
        },
        eligibleMessage : (state, action) => {
            console.log(action.payload);
            state.eligible = action.payload === "You are Eligible to Edit and Delete";
        }
    }
});


export const {
    groupDetails, allGroupsDetails, joinedGroupDetails,
    allGroupsMessage, eligibleMessage
} = groupSlice.actions;
export default groupSlice.reducer;