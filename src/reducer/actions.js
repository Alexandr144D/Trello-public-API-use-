import * as constants from './constants';
import request from 'superagent';
import Logger from '../services/logger';

const logger = new Logger();

export const loginAction = (key, token) => async (dispatch) => {
    dispatch({type: constants.LOGIN_START});

    try {
        const response = await request.get(`https://api.trello.com/1/members/me/?key=${key}&token=${token}`)
        const body = response.body;

        if (body) {
            dispatch({
                type: constants.LOGIN_SUCCESS,
                id: body.id,
                email: body.email,
                fullName: body.fullName,
                idBoards: body.idBoards,
                initials: body.initials,
                username: body.username
            });
        }

        for (const board of body.idBoards) {
            const boardInfo = await request.get(`https://api.trello.com/1/boards/${board}?key=${key}&token=${token}`);
            const result = boardInfo.body;

            dispatch({type: constants.FETCH_ALL_BOARDS, result});
        }
    } catch (error) {
        logger.logger('Invalid KEY or TOKEN. Try Again.')
        dispatch({type: constants.LOGIN_FAIL});
    }

};

export const logoutAction = () => (dispatch) => {
    return dispatch({type: constants.LOG_OUT})
};

export const userKeyAction = (key) => (dispatch) => {
    return dispatch({type: constants.USER_KEY_CHANGE, key})
};

export const userTokenAction = (token) => (dispatch) => {
    return dispatch({type: constants.USER_TOKEN_CHANGE, token})
};

export const getBoardLists = (id) => async (dispatch, getState) => {
    const state = getState().rootReducer;

    if (id === undefined) {
        dispatch({type: constants.NO_BOARD_CHOSEN});
        return
    }

    const lists = await request.get(`https://api.trello.com/1/boards/${id}/lists?key=${state.key}&token=${state.token}`);
    const body = lists.body;
    const tasks = await request.get(`https://api.trello.com/1/boards/${id}/cards?key=${state.key}&token=${state.token}`);
    body.cards = tasks.body;
    dispatch({type: constants.GET_BOARD_INFO_BY_ID, lists: body, activeBoardId: id});
};

export const getBoardActions = (id) => async (dispatch, getState) => {
    const state = getState().rootReducer;

    const actions = await request.get(`https://api.trello.com/1/boards/${id}/actions?key=${state.key}&token=${state.token}`);
    dispatch({type: constants.FETCH_BOARD_ACTIONS, actionsList: actions.body})
};
