import { 
  IonButtons, 
  IonGrid, 
  IonRow,
  IonCol,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
// import './Page.css';

const Home: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

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
        <IonGrid>
          <IonRow>
            <IonHeader>Home Page Here</IonHeader>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
