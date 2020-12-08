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
  IonList,
  IonSpinner
} from '@ionic/react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { camera } from 'ionicons/icons';
import styled from 'styled-components';
import { ContentWithFooter, FooterButton } from '../components/ContentWithFooter';
import ReactHlsPlayer from 'react-hls-player';
import * as t from '../ducks/types';
import actions, { triggerCapture } from '../ducks/actions';
import { getImageURL } from '../utils/helper';

const IonCustomGrid = styled(IonGrid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledSpinner = styled(IonSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const PlayerContainer = styled.div<{loading: boolean}>`
  position: relative;
  width: 100%;
  padding: 2mm 4mm;
  text-align: center;
  border: 2px solid white;
  border-radius: 2px;
  
  video {
    opacity: ${({ loading }) => loading ? '0.6' : '1'};
    filter: ${({ loading }) => loading ? 'blur(2px)' : 'unset'}
  }
`

const StyledImage = styled.img`
  max-height: 40vh;
`

interface ICameraProps {
  activeBlendedImage: string | null,
  triggerCapture: (scene: 'indoor' | 'outdoor') => t.ActionTypes,
  createRoom: (room: t.IPropertyRoom) => t.ActionTypes,
  cameraLoading: boolean
}

const MemoizedHlsPlayer = React.memo(ReactHlsPlayer);

const Camera: React.FC<ICameraProps> = ({
  activeBlendedImage, 
  triggerCapture, 
  cameraLoading, 
  createRoom
}) => {

  const [ roomName, setRoomName ] = useState('');
  const [ scene, setScene ] = useState<'indoor' | 'outdoor'>('indoor');

  const onCapture = () => {
    triggerCapture(scene);
  }

  const onCreateRoom = () => {
    if(!activeBlendedImage) 
      return alert('Please capture an image first before saving.');
    if(!roomName) 
      return alert('Please enter a valid room name [e.g. Bedroom].');
    createRoom({
      mode: scene,
      name: roomName,
      mediapath: activeBlendedImage,
    });
  }

  const AddRoomImageBtn = (
    <FooterButton disabled={cameraLoading} onClick={onCreateRoom}>Create Room Image</FooterButton>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add Room</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={AddRoomImageBtn}>
          <IonCustomGrid>
          <IonRow class="ion-justify-content-center ion-align-items-center" style={{flexGrow: '2'}}>
            <PlayerContainer loading={cameraLoading}>
              {cameraLoading && <StyledSpinner name="crescent"></StyledSpinner>}
              {activeBlendedImage ?
              <StyledImage src={getImageURL(activeBlendedImage)}></StyledImage> :
              <MemoizedHlsPlayer key="player"
                  url='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
                  autoplay={true}
                  controls={false}
                  muted={true}
                  width="100%"
                  height="auto"
              />}
            </PlayerContainer>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <ShutterButton color="danger" disabled={cameraLoading} onClick={onCapture}>
              <IonIcon icon={camera} size="large"></IonIcon>
            </ShutterButton>
          </IonRow>
          <IonRow>
            <StyledIonList>
              <IonItemDivider>Room Details</IonItemDivider>
              <IonItem>
                <StyledFormLabel slot="start">Scene</StyledFormLabel>
                <IonSegment value={scene} disabled={cameraLoading} onIonChange={(e: any) => setScene(e.detail.value || 'indoor')}>
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
        </IonCustomGrid>
        </ContentWithFooter>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: t.IAppState) => ({
  activeBlendedImage: state.activeBlendedImage,
  cameraLoading: state.isLoadingState.camera, 
});

const mapDispatchToProps = {
  triggerCapture: actions.triggerCapture,
  createRoom: actions.createPropertyRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
