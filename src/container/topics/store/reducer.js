import {CHANGE_REPOSITORIES} from './actions';
const initState = {
    repositories: [],
};
const reducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_REPOSITORIES:
            return {repositories: [...action.repositoriesList]}
    }
    return state;
};
export default reducer;