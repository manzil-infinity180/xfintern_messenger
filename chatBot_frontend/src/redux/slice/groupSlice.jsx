import {createSlice} from '@reduxjs/toolkit'

const initialGroupState = {
    isAuthenticated: false,
    loading: false,
    group: null
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
        }
    }
});


export const {
    groupDetails, allGroupsDetails, joinedGroupDetails,
    allGroupsMessage
} = groupSlice.actions;
export default groupSlice.reducer;