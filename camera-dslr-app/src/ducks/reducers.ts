import * as t from './types';

const initialState : t.IAppState = {
    activeProperty: null,
    activeBlendedImage: null,
    propertyList: [{
        id: 1,
        agentName: "John Doe",
        address: "143 St.",
        numOfBathrooms: 1,
        numOfBedrooms: 1
    },
    {
        id: 2,
        agentName: "John Doe",
        address: "456 Somewhere Rd.",
        numOfBathrooms: 2,
        numOfBedrooms: 3
    },
    {
        id: 3,
        agentName: "John Doe",
        address: "789 Real Condo",
        numOfBathrooms: 1,
        numOfBedrooms: 4
    }],
    roomList: [],
    isLoadingState: {
        addProperty: false,
        properties: false,
        propertyRooms: false,
        camera: false,
        addRoom: false,
    },
    errorState: null
}

export default (state = initialState, action: t.ActionTypes) => {
    switch(action.type) {
        case t.SET_ACTIVE_PROPERTY:
            return {
                ...state,
                activeProperty: action.payload,
            }
        case t.CREATE_PROPERTY:
            return {
                ...state,
                isLoadingState: {
                    ...state.isLoadingState,
                    addProperty: true
                },
                errorState: null,
            }
        case t.CREATE_PROPERTY_SUCCESS:
            return {
                ...state,
                errorState: null,
                isLoadingState: {
                    ...state.isLoadingState,
                    addProperty: false
                },
                activeProperty: action.payload,
            }
        case t.CREATE_PROPERTY_FAILURE:
            return {
                ...state,
                isLoadingState: {
                    ...state.isLoadingState,
                    addRoom: false
                },
                errorState: action.payload,
            }
        case t.CREATE_PROPERTY_ROOM:
            return {
                ...state,
                isLoadingState: {
                    ...state.isLoadingState,
                    addRoom: true
                },
                errorState: null,
            }
        case t.CREATE_PROPERTY_ROOM_SUCCESS:
            return {
                ...state,
                errorState: null,
                isLoadingState: {
                    ...state.isLoadingState,
                    addRoom: false
                },
            }
        case t.CREATE_PROPERTY_ROOM_FAILURE:
            return {
                ...state,
                isLoadingState: {
                    ...state.isLoadingState,
                    addRoom: false
                },
                errorState: action.payload,
            }
        case t.GET_PROPERTIES:
            return {
                ...state,
                errorState: null,
                isLoadingState: {
                    ...state.isLoadingState,
                    properties: true
                }
            }
        case t.GET_PROPERTIES_SUCCESS:
            return {
                ...state,
                errorState: null,
                propertyList: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    properties: false
                }
            }
        case t.GET_PROPERTIES_FAILURE:
            return {
                ...state,
                errorState: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    properties: false
                }
            }
        case t.GET_PROPERTY_ROOMS:
            return {
                ...state,
                errorState: null,
                isLoadingState: {
                    ...state.isLoadingState,
                    propertyRooms: true
                }
            }
        case t.GET_PROPERTY_ROOMS_SUCCESS:
            return {
                ...state,
                errorState: null,
                roomList: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    propertyRooms: false
                }
            }
        case t.GET_PROPERTY_ROOMS_FAILURE:
            return {
                ...state,
                errorState: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    propertyRooms: false
                }
            }
        case t.TRIGGER_CAPTURE:
            return {
                ...state,
                errorState: null,
                activeBlendedImage: null,
                isLoadingState: {
                    ...state.isLoadingState,
                    camera: true
                }
            }
        case t.TRIGGER_CAPTURE_SUCCESS:
            return {
                ...state,
                errorState: null,
                activeBlendedImage: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    camera: false
                }
            }
        case t.TRIGGER_CAPTURE_FAILURE:
            return {
                ...state,
                errorState: action.payload,
                isLoadingState: {
                    ...state.isLoadingState,
                    camera: false
                }
            }
        default:
            return state;
    }
    return state;
}