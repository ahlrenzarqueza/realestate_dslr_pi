const initialState = {
    projectName: '',
    images: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "CREATE_PROJECT":
            state.projectName = action.projectName;
            break;
        default:
            return state;
    }
    return state;
}