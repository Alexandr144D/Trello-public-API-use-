import * as constants from './constants';

const initialState = {
    key: '',
    token: '',
    isFetching: false,
    isAuthorizied: false,
    userInfo: {id: '', email: '', fullName: '', idBoards: [], initials: '', username: ''},
    allBoards: [],
    chosenBoardLists: [],
    newCardName: '',
    activeBoardId: '',
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case constants.LOG_OUT:
            return {
                ...state,
                key: '',
                token: '',
                isFetching: false,
                isAuthorizied: false,
                userInfo: {id: '', email: '', fullName: '', idBoards: [], initials: '', username: ''},
                allBoards: [],
                chosenBoardLists: [],
                newCardName: '',
                actionsList: []
            };

        case constants.LOGIN_START:
            return {...state, isAuthorizied: false, isFetching: true};

        case constants.LOGIN_SUCCESS:
            const newUserInfo = Object.create(null);
            newUserInfo.id = action.id;
            newUserInfo.email = action.email;
            newUserInfo.fullName = action.fullName;
            newUserInfo.idBoards = action.idBoards;
            newUserInfo.initials = action.initials;
            newUserInfo.username = action.username;

            return {
                ...state,
                isAuthorizied: true,
                isFetching: false,
                userInfo: newUserInfo
            };

        case constants.USER_KEY_CHANGE:
            return {...state, key: action.key};

        case constants.USER_TOKEN_CHANGE:
            return {...state, token: action.token};

        case constants.FETCH_ALL_BOARDS:
            const newBoardsArray = state.allBoards.slice();
            newBoardsArray.push(action.result);
            return {...state, allBoards: newBoardsArray};

        case constants.GET_BOARD_INFO_BY_ID:
            return {...state, chosenBoardLists: action.lists, activeBoardId: action.activeBoardId};

        case constants.NO_BOARD_CHOSEN:
            return {...state, chosenBoardLists: []};

        case constants.FETCH_BOARD_ACTIONS:
            return {
                ...state,
                actionsList: action.actionsList
            };
        case constants.LOGIN_FAIL:
            return {...state, isFetching: false};
        default:
            return state;
    }
}
