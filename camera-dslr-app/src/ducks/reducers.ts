import * as t from './types';

const initialState : t.IAppState = {
    activeProperty: null,
    propertyList: [{
        id: 1,
        agent: "John Doe",
        address: "143 St.",
        numBathroom: 1,
        numBedroom: 1
    },
    {
        id: 2,
        agent: "John Doe",
        address: "456 Somewhere Rd.",
        numBathroom: 2,
        numBedroom: 3
    },
    {
        id: 3,
        agent: "John Doe",
        address: "789 Real Condo",
        numBathroom: 1,
        numBedroom: 4
    }],
    roomList: [],
    isLoadingState: {
        properties: false,
        propertyRooms: false
    },
    errorState: null
}

export default (state = initialState, action: t.ActionTypes) => {
    switch(action.type) {
        case t.CREATE_PROPERTY:
            state.errorState = null;
            break;
        case t.CREATE_PROPERTY_SUCCESS:
            state.activeProperty = action.payload;
            break;
        case t.CREATE_PROPERTY_FAILURE:
            state.errorState = action.payload;
            break;
        case t.GET_PROPERTY_ROOMS:
            state.errorState = null;
            state.isLoadingState.propertyRooms = true;
            break;
        case t.GET_PROPERTY_ROOMS_SUCCESS:
            state.isLoadingState.propertyRooms = false;
            state.roomList = action.payload;
            break;
        case t.GET_PROPERTY_ROOMS_FAILURE:
            state.isLoadingState.propertyRooms = false;
            state.errorState = action.payload;
            break;
        default:
            return state;
    }
    return state;
}