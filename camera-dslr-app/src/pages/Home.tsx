import { 
  IonButtons, 
  IonGrid, 
  IonRow,
  IonButton,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonText
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

const IonCustomGrid = styled(IonGrid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 100%;
`

const IonBlockButton = styled(IonButton)`
  width: 100%;
  margin: 2mm;
`

const Home = ({ history } : RouteComponentProps ) => {

  const navigateTo = (e : React.MouseEvent, path : string) => {
    e.preventDefault();
    history.push(path);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCustomGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center" style={{flexGrow: '3'}}>
            <IonText>Logo Here</IonText>
          </IonRow>
          <IonRow>
            <IonBlockButton color="primary" expand="block" onClick={(e: React.MouseEvent) => navigateTo(e, '/addproperty')}>New Property</IonBlockButton>
          </IonRow>
          <IonRow>
            <IonBlockButton color="secondary" expand="block" onClick={(e: React.MouseEvent) => navigateTo(e, '/properties')}>Select existing Property...</IonBlockButton>
          </IonRow>
          <IonRow>
            <IonBlockButton color="tertiary" expand="block" onClick={(e: React.MouseEvent) => navigateTo(e, '/settings')}>Settings</IonBlockButton>
          </IonRow>
        </IonCustomGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
