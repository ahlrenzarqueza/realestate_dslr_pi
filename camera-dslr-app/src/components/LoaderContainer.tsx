import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import {
    IonSpinner
  } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { NavContext } from '@ionic/react';
  
const StyledSpinner = styled(IonSpinner)`
  flex: 2;
  align-self: center;
  width: 15mm
`

interface ILoaderContainerProps {
  loadingState: boolean,
}

const LoaderContainer : React.FC<ILoaderContainerProps> =  ({loadingState, ...props}) => {
  return (
      <React.Fragment>
        {loadingState ?
            <StyledSpinner name="crescent"></StyledSpinner> :
            props.children
          }
      </React.Fragment>
  )
}

export default LoaderContainer;