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
  IonCardSubtitle,
  IonCardHeader
} from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import LoaderContainer from '../components/LoaderContainer';
import * as t from '../ducks/types';

const StyledCardList = styled(IonList)`
  display: flex;
  flex-wrap: wrap;

  ion-card {
    width: 100%;
    margin: 4mm;
  }
`

const StyledCardSubtitle = styled(IonCardSubtitle)`
  color: var(--ion-text-color);
`

interface IPropertyGalleryProps extends RouteComponentProps {
  propertyList: t.IPropertyDb[],
  isLoadingState: boolean
}

const PropertyGallery: React.FC<IPropertyGalleryProps> = ({ history, propertyList, isLoadingState }) => {

  const BackToHomeBtn = (
    <FooterNavButton linkto="/home" isBackMode={true} history={history}>Back to Home</FooterNavButton>
  )

  const handlePropertySelect = (property: t.IPropertyDb) => {
    alert('Clicked on ' + property.id)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Property Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={BackToHomeBtn}>
          <LoaderContainer loadingState={isLoadingState}>
            <StyledCardList>
              {propertyList.map((property) => 
                  <IonCard key={property.id} onClick={() => handlePropertySelect(property)}>
                    <IonCardHeader>
                      <StyledCardSubtitle>{property.address}</StyledCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
              )}
            </StyledCardList>
          </LoaderContainer>
        </ContentWithFooter>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = ({ propertyList, isLoadingState } : t.IAppState) => ({
  propertyList,
  isLoadingState: isLoadingState.properties
})

export default connect(mapStateToProps)(PropertyGallery);
