import { 
  IonButton,
  IonButtons,
  IonIcon, 
  IonList, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonText,
  IonImg,
  useIonViewWillEnter
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useParams, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import placeholderimage from '../assets/room-placeholder.jpg';
import { connect } from 'react-redux';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import { IAppState, IPropertyDb } from '../ducks/types';
import LoaderContainer from '../components/LoaderContainer';
import actions from '../ducks/actions';
import * as t from '../ducks/types';

const StyledCardList = styled(IonList)`
  position: relative;
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-wrap: wrap;

  ion-card {
    flex-basis: calc(50% - 6mm);
    margin: 3mm;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4mm;
  background-color: var(--ion-toolbar-background);
  border-bottom-width: .55px;
    border-bottom-style: solid;
    border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));
  width: 100%;
`

const PropertyNameLabel = styled(IonText)`

`

interface IProps extends RouteComponentProps {
  isLoadingState: boolean,
  activeProperty: IPropertyDb | null,
  roomList: t.IPropertyRoom[],
  getPropertyRooms: (id: t.IPropertyDb["id"]) => t.ActionTypes,
  setActiveProperty: (p: t.IPropertyDb) => t.ActionTypes,
}

const RoomGallery: React.FC<IProps> = ({ location, history, isLoadingState, activeProperty, roomList, getPropertyRooms,
  setActiveProperty }) => {

  const BackToPropertiesBtn = (
    <FooterNavButton linkto="/properties" isBackMode={true} history={history} color="tertiary">Back to Properties</FooterNavButton>
  )

  const onAddRoom = () => {
    history.push('/camera');
  }

  const { propertyId } = useParams<{ propertyId: string; }>();

  useIonViewWillEnter(() => {
    if(!location.state) {
      history.push('/properties');
    }
    setActiveProperty(location.state as t.IPropertyDb);
    getPropertyRooms(parseInt(propertyId));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Room Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={BackToPropertiesBtn}>
          <HeaderContainer>
            <PropertyNameLabel>
              <h3>{ activeProperty && activeProperty.address }</h3>
            </PropertyNameLabel>
            <IonButton color="primary" size="small" onClick={onAddRoom}>
              <IonText>Add Room</IonText>
              <IonIcon icon={add} slot="start"></IonIcon>
            </IonButton>
          </HeaderContainer>
          <LoaderContainer loadingState={isLoadingState}>
            <StyledCardList>
              {roomList.map(room => (
                 <IonCard key={room.roomId}>
                  <IonImg src={placeholderimage}></IonImg>
                  <IonCardHeader>
                    <IonCardSubtitle>{room.mode == 'indoor' ? 'INDOOR' : 'OUTDOOR'} ROOM</IonCardSubtitle>
                    <IonCardTitle>{room.name}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              ))}
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>OUTDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Garden</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </StyledCardList>
          </LoaderContainer>
        </ContentWithFooter>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = ({ isLoadingState, activeProperty, roomList } : IAppState) => ({
  isLoadingState: isLoadingState.propertyRooms,
  activeProperty,
  roomList,
})

const mapDispatchToProps = {
  getPropertyRooms: actions.getPropertyRooms,
  setActiveProperty: actions.setActiveProperty,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomGallery);
