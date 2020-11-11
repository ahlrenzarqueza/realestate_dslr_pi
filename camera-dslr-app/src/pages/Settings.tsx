import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonLabel,
  IonItem,
  IonList
} from '@ionic/react';
import React from 'react';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import { RouteComponentProps } from 'react-router-dom';

const Settings : React.FC<RouteComponentProps> = ({ history }) => {
  const BackToHomeBtn = (
    <FooterNavButton linkto="/home" isBackMode={true} history={history}>Back to Home</FooterNavButton>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={BackToHomeBtn}>
          <IonList>
            <IonItem detail={true}>
              <IonLabel>Format Memory Stick</IonLabel>
            </IonItem>
          </IonList>
        </ContentWithFooter>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
