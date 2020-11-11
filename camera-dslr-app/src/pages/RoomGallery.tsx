import { 
  IonButtons, 
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
  IonImg
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import placeholderimage from '../assets/room-placeholder.jpg';
import { connect } from 'react-redux';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import { IAppState, IPropertyDb } from '../ducks/types';
import LoaderContainer from '../components/LoaderContainer';

const StyledCardList = styled(IonList)`
  display: flex;
  flex-wrap: wrap;

  ion-card {
    flex-basis: calc(50% - 6mm);
    margin: 3mm;
  }
`

const PropertyNameLabel = styled(IonText)`
  background-color: var(--ion-toolbar-background);
  width: 100%;

  h1 {
    padding: 4mm;
    margin: 0;
  }
`

interface IProps extends RouteComponentProps {
  isLoadingState: boolean,
  activeProperty: IPropertyDb | null
}

const RoomGallery: React.FC<IProps> = ({ history, isLoadingState, activeProperty }) => {

  const BackToPropertiesBtn = (
    <FooterNavButton linkto="/properties" isBackMode={true} history={history}>Back to Properties</FooterNavButton>
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
      <PropertyNameLabel slot="fixed">
          <h1>{ activeProperty && activeProperty.address }</h1>
        </PropertyNameLabel>
      <IonContent>
        <LoaderContainer loadingState={isLoadingState}>
          <ContentWithFooter ButtonComponent={BackToPropertiesBtn}>
            <StyledCardList>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>INDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Bedroom A</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>OUTDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Garden</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>INDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Bedroom A</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>OUTDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Garden</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>INDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Bedroom A</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonImg src={placeholderimage}></IonImg>
                <IonCardHeader>
                  <IonCardSubtitle>OUTDOOR ROOM</IonCardSubtitle>
                  <IonCardTitle>Garden</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </StyledCardList>
          </ContentWithFooter>
        </LoaderContainer>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = ({ isLoadingState, activeProperty } : IAppState) => ({
  isLoadingState: isLoadingState.propertyRooms,
  activeProperty
})

export default connect(mapStateToProps)(RoomGallery);
