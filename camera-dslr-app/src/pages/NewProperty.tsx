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
import LoaderContainer from '../components/LoaderContainer';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { usePrevious } from '../utils/helper';
import actions from '../ducks/actions';
import * as t from '../ducks/types';

interface IComponentProps extends RouteComponentProps {
  isLoadingState: boolean,
  createProperty: (p : t.IProperty) => t.ActionTypes,
  successState: string | null,
  activeProperty: t.IPropertyDb | null,
}

const NewProperty : React.FC<IComponentProps> = ({ 
  history, 
  createProperty,
  isLoadingState,
  successState,
  activeProperty
 } ) => {
  const [ address, setAddress ] = useState<string>('');
  const [ agentName, setAgentName ] = useState<string>('');
  const [ numOfBedrooms, setNumOfBedrooms ] = useState(0);
  const [ numOfBathrooms, setNumOfBathrooms ] = useState(0);

  const refSuccessState = usePrevious(successState);

  useEffect(() => {
    if(!activeProperty) return;
    if(refSuccessState === null && successState) 
      return history.push(`/gallery/${activeProperty.id}`)
  }, [successState])

  const onCreate = () => {
    const property : t.IProperty = {
      address, 
      agentName, 
      numOfBedrooms, 
      numOfBathrooms
    }
    createProperty(property);
  }

  const CreateFooterBtn = (
    <FooterButton onClick={onCreate} disabled={isLoadingState}>Create</FooterButton>
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
          <LoaderContainer loadingState={isLoadingState}>
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
                <IonInput value={numOfBedrooms} type="number" placeholder="1" onIonChange={(e : any) => setNumOfBedrooms(e.detail.value)}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Number of Bathrooms</IonLabel>
                <IonInput value={numOfBathrooms} type="number" placeholder="1" onIonChange={(e : any) => setNumOfBathrooms(e.detail.value!)}></IonInput>
              </IonItem>
            </IonList>
          </LoaderContainer>  
        </ContentWithFooter>
      </IonContent>  
    </IonPage>
  );
};

const mapStateToProps = (state : t.IAppState) => ({
  isLoadingState: state.isLoadingState.addProperty,
  successState: state.successState,
  activeProperty: state.activeProperty,
})

const mapDispatchToProps = {
  createProperty: actions.createProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProperty);
