import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
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
            let users = action.payload.results.map((o) => {
                // Set full name here, better to set once rather than generating each time needed.
                _.set(o, 'name.full', _.get(o, 'name.first') + ' ' + _.get(o, 'name.last'));
                // Convert to moment here, so then format can be whatever format required by the views
                _.set(o, 'registered.date', moment(_.get(o, 'registered.date')));
                return o;
            });
            let info = action.payload.info;
            // Add max number of pages, not available from randomuser.me. I assume pageSize is max number of page.
            _.set(info, 'pageSize', 2);

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
        axios.get(url, { params: params })
            .then((response) => {
                dispatch(setUsers(response.data));
                _.invoke(callbackSuccess);
            })
            .catch(callbackError);
    };
};

export default dataSlice.reducer;
