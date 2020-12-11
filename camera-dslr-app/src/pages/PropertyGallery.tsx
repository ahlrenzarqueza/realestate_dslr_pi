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
  IonCardHeader,
  IonButton,
  IonIcon,
  IonAlert,
  useIonViewWillEnter
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import LoaderContainer from '../components/LoaderContainer';
import actions from '../ducks/actions';
import * as t from '../ducks/types';

const StyledCardList = styled(IonList)<{ empty: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
  align-items: flex-start;
  align-content: flex-start;

  &:before {
    content: '${({ empty }) => empty ? 'No properties to show.' : ''}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.7;
  }

  ion-card {
    width: 100%;
    margin: 4mm;
  }
`

const StyledCardSubtitle = styled(IonCardSubtitle)`
  max-width: calc(100% - 30px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--ion-text-color);
`

const StyledButton = styled(IonButton)`
    position: absolute;
    top: 6px;
    right: 10px;

    &::part(native) {
        padding: 7px;
        width: 30px;
        height: 30px;
    }
`;

interface IPropertyGalleryProps extends RouteComponentProps {
  propertyList: t.IPropertyDb[],
  isLoadingState: boolean,
  getProperties: () => t.ActionTypes,
  setActiveProperty: (p: t.IPropertyDb) => t.ActionTypes,
  deleteProperty: (id: number) => t.ActionTypes,
}

const PropertyGallery: React.FC<IPropertyGalleryProps> = ({ 
  history, 
  propertyList, 
  isLoadingState,
  getProperties,
  setActiveProperty,
  deleteProperty
 }) => {

  const [deletePropertyConfirm, setDeletePropertyConfirm] = useState<t.IPropertyDb | null>(null);

  useIonViewWillEnter(() => {
    getProperties();
  });

  const BackToHomeBtn = (
    <FooterNavButton linkto="/home" isBackMode={true} history={history} color="tertiary">
      Back to Home
    </FooterNavButton>
  )

  const handlePropertySelect = (property: t.IPropertyDb) => {
    history.push({
      pathname: `/gallery/${property.id}`,
      state: property
    });
  }

  const onDelete = (e: React.MouseEvent, property: t.IPropertyDb) => {
    e.stopPropagation();
    setDeletePropertyConfirm(property);
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
            <StyledCardList empty={!propertyList.length}>
              {propertyList.map((property) => 
                  <IonCard key={property.id} onClick={() => handlePropertySelect(property)}>
                    <IonCardHeader>
                      <StyledCardSubtitle>{property.address}</StyledCardSubtitle>
                      <StyledButton color="danger" size="small" onClick={(e: React.MouseEvent) => onDelete(e, property)}>
                        <IonIcon icon={trashOutline} size="small"></IonIcon>
                      </StyledButton>
                    </IonCardHeader>
                  </IonCard>
              )}
            </StyledCardList>
          </LoaderContainer>
        </ContentWithFooter>

        {deletePropertyConfirm && 
          <IonAlert
            isOpen={deletePropertyConfirm !== null}
            onDidDismiss={() => setDeletePropertyConfirm(null)}
            cssClass='my-custom-class'
            header={'Delete Property'}
            subHeader={''}
            message={`Are you sure you want to delete property: ${deletePropertyConfirm.address}?`}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                  setDeletePropertyConfirm(null);
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  console.log('Confirm Ok');
                  deleteProperty(deletePropertyConfirm.id);
                  setDeletePropertyConfirm(null);
                }
              }
            ]}
          />
        }
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
  setActiveProperty: actions.setActiveProperty,
  deleteProperty: actions.deleteProperty,
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGallery);
