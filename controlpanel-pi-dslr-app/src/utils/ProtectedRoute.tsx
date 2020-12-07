import React, { useState, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState, ActionTypes, ILoggedInUser } from '../ducks/types';
import * as actions from '../ducks/actions';

interface IStateProps {
    loggedInUser: ILoggedInUser | null,
    authError: boolean
}

interface IDispatchProps {
    authenticateSession: () => ActionTypes;
}

interface IComponentProp extends RouteProps {
    component: React.FC<any>  
}

interface IProps extends IStateProps, IDispatchProps, IComponentProp {}

const ProtectedRoute:React.FC<IProps> = ({
    component: Component, 
    loggedInUser, 
    authError,
    authenticateSession, 
    ...rest
}) => {
    const [ allowedAccess, setAllowedAccess ] = useState<any>('authenticating');

    useEffect(() => {
        if (authError === true) {
            setAllowedAccess(false);
        }
        else if(!loggedInUser) {
            authenticateSession();
            setAllowedAccess('authenticating');
        }
        else {
            console.log('is logged in', loggedInUser);
            setAllowedAccess('hihi');
        }
    }, [loggedInUser, authError]);

    useEffect(() => {
        console.log('authError changed', authError);
    }, [authError])

    return (
        <Route {...rest} render={
            (props) => {
                if (allowedAccess === 'hihi')
                    return <Component {...props}></Component>
                else if (allowedAccess === 'authenticating') {
                    return <h2>Authenticating...</h2>
                }
                else if (allowedAccess === false) {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
                return;
            }
        }/>
    )
}

const mapStateToProps = (state: IAppState) => ({
    loggedInUser: state.loggedInUser,
    authError: state.authError
})

const mapDispatchToProps = {
    authenticateSession: actions.authSession
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (ProtectedRoute);
