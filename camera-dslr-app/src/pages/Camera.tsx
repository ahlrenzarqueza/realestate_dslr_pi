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
  IonText,
  IonLabel,
  IonIcon,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonItem,
  IonItemDivider,
  IonList
} from '@ionic/react';
import React, { useState } from 'react';
import { camera } from 'ionicons/icons';
import styled from 'styled-components';
import { ContentWithFooter, FooterButton } from '../components/ContentWithFooter';

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

const ShutterButton = styled(IonButton)`
  width: 30mm;
  height: 15mm;
  --border-radius: 40mm;
`

const StyledIonList = styled(IonList)`
  width: 100%;
  margin: 6mm 0;
`

const StyledFormLabel = styled(IonLabel)`
  width: 30mm;
  margin: 0;
  flex: unset;
  padding-right: 2mm;
`

const Camera: React.FC = () => {

  const [ roomName, setRoomName ] = useState('');
  const [ scene, setScene ] = useState<string>('indoor');
  const AddRoomImageBtn = (
    <FooterButton>Create Room Image</FooterButton>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={AddRoomImageBtn}>
          <IonCustomGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center" style={{flexGrow: '2'}}>
            <IonText>Camera goes here</IonText>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <ShutterButton color="danger">
              <IonIcon icon={camera} size="large"></IonIcon>
            </ShutterButton>
          </IonRow>
          <IonRow>
            <StyledIonList>
              <IonItemDivider>Room Details</IonItemDivider>
              <IonItem>
                <StyledFormLabel slot="start">Scene</StyledFormLabel>
                <IonSegment value={scene} onIonChange={e => setScene(e.detail.value || 'indoor')}>
                  <IonSegmentButton value="indoor">
                    <IonLabel>Indoor</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="outdoor">
                    <IonLabel>Outdoor</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonItem>
              <IonItem>
                <StyledFormLabel slot="start">Room Name</StyledFormLabel>
                <IonInput value={roomName} placeholder="e.g. Bedroom A" onIonChange={e => setRoomName(e.detail.value!)}></IonInput>
              </IonItem>
            </StyledIonList>
          </IonRow>
          {/* <IonRow>
            <IonBlockButton color="primary">Add Room Image</IonBlockButton>
          </IonRow> */}
        </IonCustomGrid>
        </ContentWithFooter>
      </IonContent>
    </IonPage>
  );
};

export default Camera;
