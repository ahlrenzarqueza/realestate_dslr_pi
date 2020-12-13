import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonSpinner,
  IonIcon,
  IonAlert,
} from '@ionic/react';
import { trashBin } from 'ionicons/icons'
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ContentWithFooter, FooterNavButton } from '../components/ContentWithFooter';
import { RouteComponentProps } from 'react-router-dom';
import { ActionTypes, IAppState } from '../ducks/types';
import { deleteAll } from '../ducks/actions';

interface SettingsProps extends RouteComponentProps {
  deleteAllLoading: boolean,
  dispatch: (a: ActionTypes) => void
}

const Settings : React.FC<SettingsProps> = ({ 
  history, 
  deleteAllLoading,
  dispatch,
}) => {

  const [deleteAllConfirm, setDeleteAllConfirm] = useState<boolean>(false);

  const BackToHomeBtn = (
    <FooterNavButton linkto="/home" isBackMode={true} history={history}>Back to Home</FooterNavButton>
  )

  const onDeleteAllConfirm = () => {
    dispatch(deleteAll());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentWithFooter ButtonComponent={BackToHomeBtn}>
          <IonList>
            <IonItem button onClick={() => setDeleteAllConfirm(true)}>
              {deleteAllLoading ?
                <IonSpinner slot="start" name="crescent"></IonSpinner> :
                <IonIcon slot="start" icon={trashBin} size="small"></IonIcon>
              }
              <IonLabel>Delete All Data</IonLabel>
            </IonItem>
          </IonList>
        </ContentWithFooter>

        {deleteAllConfirm && 
          <IonAlert
            isOpen={deleteAllConfirm}
            onDidDismiss={() => setDeleteAllConfirm(false)}
            cssClass='my-custom-class'
            header={'Delete ALL Data'}
            subHeader={''}
            message={`This will delete ALL property data and images, including unblended ones in the media path.
                      Are you sure you want to continue?`}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                  setDeleteAllConfirm(false);
                }
              },
              {
                text: 'Ok',
                handler: () => {
                  console.log('Confirm Ok');
                  onDeleteAllConfirm();
                  setDeleteAllConfirm(false);
                }
              }
            ]}
          />
        }
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IAppState) => ({
  deleteAllLoading: state.isLoadingState.deleteAll
})

export default connect(mapStateToProps)(Settings);
