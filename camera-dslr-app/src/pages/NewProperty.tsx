import { 
  IonButtons, 
  IonList, 
  IonItem,
  IonItemDivider,
  IonLabel,
  IonInput,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';
import {ContentWithFooter, FooterButton} from '../components/ContentWithFooter';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NewProperty : React.FC<RouteComponentProps> = ({ history } ) => {
  const [ address, setAddress ] = useState('');
  const [ agentName, setAgentName ] = useState('');
  const [ numOfBedrooms, setNumOfBedrooms ] = useState('');
  const [ numOfBathrooms, setNumOfBathrooms ] = useState('');

  const CreateFooterBtn = (
    <FooterButton onClick={(e) => console.log('Create')}>Create</FooterButton>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add New Property</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={CreateFooterBtn}>
          <IonList>
            <IonItemDivider>Property Details</IonItemDivider>
            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <IonInput value={address} placeholder="Display Name" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Agent Name</IonLabel>
              <IonInput value={agentName} placeholder="Agent Name" onIonChange={e => setAgentName(e.detail.value!)}></IonInput>
            </IonItem>

            <IonItemDivider>Rooms</IonItemDivider>
            <IonItem>
              <IonLabel position="stacked">Number of Bedrooms</IonLabel>
              <IonInput value={numOfBedrooms} type="number" placeholder="1" onIonChange={e => setNumOfBedrooms(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Number of Bathrooms</IonLabel>
              <IonInput value={numOfBathrooms} type="number" placeholder="1" onIonChange={e => setNumOfBathrooms(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
        </ContentWithFooter>
      </IonContent>  
    </IonPage>
  );
};

export default NewProperty;
