import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState, ActionTypes } from '../ducks/types';
import * as actions from '../ducks/actions';

interface IStateProps {
    loggedInUser: any
}

interface IDispatchProps {
    authenticateSession: () => ActionTypes;
}

interface IComponentProp {
    path: string,
    component: React.FC<any>  
}

interface IProps extends IStateProps, IDispatchProps, IComponentProp {}

const ProtectedRoute:React.FC<IProps> = ({
    component: Component, 
    loggedInUser, 
    authenticateSession, 
    ...rest
}) => {
    const [ allowedAccess, setAllowedAccess ] = useState(null);

    useEffect(() => {
        if(!loggedInUser) authenticateSession();
    }, []);

    useEffect(() => {
        
    }, [loggedInUser]);

    return (
        <Route {...rest} render={
            (props) => {
                if (allowedAccess)
                    return <Component {...props}></Component>
                else if(allowedAccess === false) {
                    return <Redirect to={
                        {
                            pathname: "/",
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
    loggedInUser: state.loggedInUser
})

const mapDispatchToProps = {
    authenticateSession: actions.authSession
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (ProtectedRoute);
