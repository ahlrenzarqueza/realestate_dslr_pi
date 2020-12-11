import Menu from './components/Menu';
import Page from './pages/Page';
import Home from './pages/Home';
import Camera from './pages/Camera';
import NewProperty from './pages/NewProperty';
import RoomGallery from './pages/RoomGallery';
import PropertyGallery from './pages/PropertyGallery';
import Settings from './pages/Settings'
import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonToast, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as t from './ducks/types';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';

setupConfig({
  rippleEffect: false,
  mode: 'ios'
});

interface IProps {
  errorState: t.IAppError | null,
  successState: string | null,
}

const App: React.FC<IProps> = ({ errorState, successState }) => {

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if(errorState != null) {
      setShowErrorToast(true)
    }
  }, [errorState])
  
  useEffect(() => {
    if(successState != null) {
      setShowSuccessToast(true)
    }
  }, [successState])


  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} />
            <Route path="/home" component={Home} exact />
            <Route path="/addproperty" component={NewProperty} exact />
            <Route path="/camera" component={Camera} exact />
            <Route path="/properties" component={PropertyGallery} exact />
            <Route path="/gallery/:propertyId" component={RoomGallery} />
            <Route path="/settings" component={Settings} exact />
            <Redirect from="/" to="/home" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>

      <IonToast
        isOpen={showErrorToast}
        color="danger"
        position="top"
        onDidDismiss={() => setShowErrorToast(false)}
        message={errorState ? errorState.message : ''}
        duration={5000}
      />

      <IonToast
        isOpen={showSuccessToast}
        color="success"
        position="top"
        onDidDismiss={() => setShowSuccessToast(false)}
        message={successState ? successState : 'Success!'}
        duration={5000}
      />
    </IonApp>
  );
};

const mapStateToProps = (state: t.IAppState) => ({
  errorState: state.errorState,
  successState: state.successState,
})

export default connect(mapStateToProps)(App);
