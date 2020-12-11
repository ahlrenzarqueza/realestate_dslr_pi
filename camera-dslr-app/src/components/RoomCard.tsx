import { 
   IonCard,
   IonImg,
   IonButton,
   IonIcon,
   IonCardHeader,
   IonCardTitle,
   IonCardSubtitle
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import React, { useCallback, useContext, memo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import placeholderimage from '../assets/room-placeholder.jpg';
import useImage from '../utils/useImage';
import * as t from '../ducks/types';
import * as actions from '../ducks/actions';

const StyledImg = styled(IonImg)`
    &::part(image) {
        height: 25vh;
        object-fit: cover;
    }
`;

const StyledButton = styled(IonButton)`
    position: absolute;
    top: 10px;
    right: 10px;

    &::part(native) {
        padding: 7px;
        width: 30px;
        height: 30px;
    }
`;

interface IRoomCardProps {
    onDelete: (room: t.IPropertyRoom) => void,
    room: t.IPropertyRoom
}

const RoomCard : React.FC<IRoomCardProps> =  ({ room, onDelete }) => {
    const roomImage = useImage(room.mediapath, placeholderimage);
    return (
    <IonCard key={room.roomId}>
        <StyledImg src={roomImage}></StyledImg>
        <IonCardHeader>
            <IonCardSubtitle>{room.mode == 'indoor' ? 'INDOOR' : 'OUTDOOR'} ROOM</IonCardSubtitle>
            <IonCardTitle>{room.name}</IonCardTitle>
            <StyledButton color="danger" size="small" onClick={() => onDelete(room)}>
              <IonIcon icon={trashOutline} size="small"></IonIcon>
            </StyledButton>
        </IonCardHeader>
    </IonCard>
    )
};

const mapDispatchToProps = {
    deletePropertyRoom: actions.deletePropertyRoom
}

export default memo(connect(null, mapDispatchToProps)(RoomCard), (prev, next) => {
    return prev.room.roomId === next.room.roomId
});