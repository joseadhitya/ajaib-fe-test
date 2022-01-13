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

export const fetchUsers = (url, params, callbackSuccess, callbackError) => {
    return (dispatch) => {
        // If has parameters, add parameters to url
        if (!_.isEmpty(params)) {
            // Add '?' to URL -> https://randomuser.me/api?
            url = url + '?';
            for (const prop in params) {
                // Foreach params, add params to URL -> https://randomuser.me/api?param1=value1&
                url = url + prop + '=' + params[prop] + '&';
            };
            // Remove trailing '&' in URL -> https://randomuser.me/api?param1=value1
            url = _.trimEnd(url, '&');
        };

        // Perform fetching
        axios.get(url)
            .then((response) => {
                dispatch(setUsers(response.data));
                _.invoke(callbackSuccess);
            })
            .catch(callbackError);
    };
};

export default dataSlice.reducer;
