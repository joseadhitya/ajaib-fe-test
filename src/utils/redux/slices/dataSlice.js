import _ from 'lodash';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    info: {},
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            let users = action.payload.results.map((o) => o); // use Adapter
            let info = action.payload.info; // use Adapter
            state.users = users;
            state.info = info;
        },
        flushData: (state) => {
            state = initialState;
        },
    },
});

export const { setUsers, flushData } = dataSlice.actions;

export const getUsers = (url, callbackSuccess, callbackError) => {
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                dispatch(setUsers(response.data));
                _.invoke(callbackSuccess);
            })
            .catch(callbackError);
    };
};

export default dataSlice.reducer;
