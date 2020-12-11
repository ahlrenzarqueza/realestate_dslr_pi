import * as t from './types';

const initialState : t.IAppState = {
    activeProperty: null,
    activeBlendedImage: null,
    propertyList: [],
    roomList: [],
    isLoadingState: {
        addProperty: false,
        properties: false,
        propertyRooms: false,
        camera: false,
        addRoom: false,
    },
    errorState: null,
    successState: null,
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
                successState: null,
            }
        case t.CREATE_PROPERTY_SUCCESS:
            return {
                ...state,
                errorState: null,
                successState: 'Property successfully created.',
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
                successState: null,
            }
        case t.CREATE_PROPERTY_ROOM_SUCCESS:
            return {
                ...state,
                errorState: null,
                successState: 'Room successfully created.',
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
                successState: null,
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
                propertyList: [],
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
                roomList: [],
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