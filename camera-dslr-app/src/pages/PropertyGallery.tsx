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
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import LoaderContainer from '../components/LoaderContainer';
import actions from '../ducks/actions';
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
  isLoadingState: boolean,
  getProperties: () => t.ActionTypes,
  setActiveProperty: (p: t.IPropertyDb) => t.ActionTypes,
}

const PropertyGallery: React.FC<IPropertyGalleryProps> = ({ 
  history, 
  propertyList, 
  isLoadingState,
  getProperties,
  setActiveProperty
 }) => {

  useEffect(() => {
    getProperties();
  }, []);

  const BackToHomeBtn = (
    <FooterNavButton linkto="/home" isBackMode={true} history={history} color="tertiary">
      Back to Home
    </FooterNavButton>
  )

  const handlePropertySelect = (property: t.IPropertyDb) => {
    // setActiveProperty(property);
    history.push({
      pathname: `/gallery/${property.id}`,
      state: property
    });
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

const mapDispatchToProps = {
  getProperties: actions.getProperties,
  setActiveProperty: actions.setActiveProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGallery);
