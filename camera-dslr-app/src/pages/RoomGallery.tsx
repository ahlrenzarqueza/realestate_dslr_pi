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
  IonText,
  IonAlert,
  useIonViewWillEnter,
  useIonViewDidEnter,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import placeholderimage from '../assets/room-placeholder.jpg';
import useImage from '../utils/useImage';
import { connect } from 'react-redux';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import { IAppState, IPropertyDb } from '../ducks/types';
import LoaderContainer from '../components/LoaderContainer';
import RoomCard from '../components/RoomCard';
import actions from '../ducks/actions';
import * as t from '../ducks/types';

const StyledCardList = styled(IonList)<{ empty: boolean }>`
  position: relative;
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-wrap: wrap;

  /* &:before {
    content: '${({ empty }) => empty ? 'No rooms to show.' : ''}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.7;
  } */

  ion-card {
    flex-basis: calc(50% - 6mm);
    margin: 3mm;
  }

  ion-card-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 30px);
    overflow: hidden;
    font-size: 24px;
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

const StyledEmptyPlaceholder = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  transform: translate(-50%,-50%);

  > ion-text {
    color: gray;
    margin-bottom: 5px;
  }

  > ion-button {
    width: 30mm
  }
`;

interface IProps extends RouteComponentProps {
  isLoadingState: boolean,
  activeProperty: IPropertyDb | null,
  roomList: t.IPropertyRoom[],
  getPropertyRooms: (id: t.IPropertyDb["id"]) => t.ActionTypes,
  setActiveProperty: (p: t.IPropertyDb) => t.ActionTypes,
  deletePropertyRoom: (n: number) => t.ActionTypes,
}

const RoomGallery: React.FC<IProps> = ({ 
  location, 
  history, 
  isLoadingState, 
  activeProperty, 
  roomList, 
  getPropertyRooms,
  setActiveProperty,
  deletePropertyRoom,
}) => {

  const [deleteRoomConfirm, setDeleteRoomConfirm] = useState<any>(null);

  const BackToPropertiesBtn = (
    <FooterNavButton linkto="/properties" isBackMode={true} history={history} color="tertiary">Back to Properties</FooterNavButton>
  )

  const onAddRoom = () => {
    history.push('/camera');
  }

  const onDelete = (room: t.IPropertyRoom) => {
    console.log('delete room:', room);
    setDeleteRoomConfirm(room);
    // deletePropertyRoom(room.roomId);
  }

  const { propertyId } = useParams<{ propertyId: string; }>();

  useEffect(() => {
    // console.log('Location state:',location.state);
    // console.log('Active Property: ', activeProperty);
    if(!activeProperty) {
      return history.push('/properties');
    }
    // if(!activeProperty) setActiveProperty(location.state as t.IPropertyDb);
    getPropertyRooms(activeProperty.id);
  }, [activeProperty]);

  const EmptyPlaceholder = (
    <StyledEmptyPlaceholder>
      <IonText>No rooms on database.</IonText>
      <IonButton color="primary" size="small" onClick={onAddRoom}>
        <IonText>Add Room</IonText>
        <IonIcon icon={add} slot="start"></IonIcon>
      </IonButton>
    </StyledEmptyPlaceholder>
  )

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
            <StyledCardList empty={!roomList.length}>
              {roomList.map(room => (
                <RoomCard room={room} onDelete={onDelete} />
              ))}

              {!roomList.length && EmptyPlaceholder}
            </StyledCardList>
          </LoaderContainer>
        </ContentWithFooter>

        {deleteRoomConfirm && 
          <IonAlert
            isOpen={!!deleteRoomConfirm}
            onDidDismiss={() => setDeleteRoomConfirm(null)}
            cssClass='my-custom-class'
            header={'Delete Room'}
            subHeader={''}
            message={`Are you sure you want to delete room: ${deleteRoomConfirm.name}?`}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                  setDeleteRoomConfirm(null);
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  console.log('Confirm Ok');
                  deletePropertyRoom(deleteRoomConfirm.roomId);
                  setDeleteRoomConfirm(null);
                }
              }
            ]}
          />
        }
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
  deletePropertyRoom: actions.deletePropertyRoom,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomGallery);
