
export const CHANGE_REPOSITORIES = 'change_repositories';

const changeRepositories = repositoriesList => ({
    type: CHANGE_REPOSITORIES,
    repositoriesList
});
export const fetchRepositories = () => {
    return  (dispatch, getState, request) => {
        // return Promise.reject('abc');
        return request.get("/api/v2/repos/wuyxp/react/docs").then(res => {
            const items = res.data.data;
            dispatch(changeRepositories(items));
        })
    }
}
