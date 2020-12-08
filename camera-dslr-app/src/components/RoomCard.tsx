import { 
   IonCard,
   IonImg,
   IonCardHeader,
   IonCardTitle,
   IonCardSubtitle
} from '@ionic/react';
import React, { useCallback, useContext } from 'react';
import placeholderimage from '../assets/room-placeholder.jpg';
import useImage from '../utils/useImage';
import * as t from '../ducks/types';

interface IRoomCardProps {
    room: t.IPropertyRoom
}

const RoomCard : React.FC<IRoomCardProps> =  ({ room }) => {
    const roomImage = useImage(room.mediapath, placeholderimage);
    return (
    <IonCard key={room.roomId}>
        <IonImg src={roomImage}></IonImg>
        <IonCardHeader>
            <IonCardSubtitle>{room.mode == 'indoor' ? 'INDOOR' : 'OUTDOOR'} ROOM</IonCardSubtitle>
            <IonCardTitle>{room.name}</IonCardTitle>
        </IonCardHeader>
    </IonCard>
    )
};

export default RoomCard;