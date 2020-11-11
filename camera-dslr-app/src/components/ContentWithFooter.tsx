import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import {
    IonButton
  } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { NavContext } from '@ionic/react';
  
const StyledButton = styled(IonButton)`
  width: calc(100% - 8mm);
  margin: 4mm;
`

const StyledContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`

interface IBackButtonProps extends React.ComponentProps<typeof FooterButton> {
    history: RouteComponentProps["history"],
    linkto?: string,
    isBackMode?: boolean
} 

interface IProps {
    ButtonComponent: React.ReactNode,
}

export const FooterButton: React.FC<React.ComponentProps<typeof IonButton>> = ({...props}) => {
  return (
      <StyledButton {...props}>{props.children}</StyledButton>
  )
}

export const FooterNavButton: React.FC<IBackButtonProps> = ({linkto, isBackMode, history, ...props}) => {
    const { goBack, navigate } = useContext(NavContext);

    // Call this function when required to redirect with the back animation
    const redirect = useCallback(
        () => {
            linkto ?
                navigate(linkto, isBackMode ? 'back' : 'forward') :
                goBack()
        },
        [navigate]
    );
    return (
        <FooterButton onClick={() => redirect()}
         {...props}>{props.children}</FooterButton>
    )
  }

export const ContentWithFooter: React.FC<IProps> = ({ ButtonComponent, ...props}) => {
    return (
        <StyledContent {...props}>
            {props.children}
            {ButtonComponent}
        </StyledContent>
    )
}


