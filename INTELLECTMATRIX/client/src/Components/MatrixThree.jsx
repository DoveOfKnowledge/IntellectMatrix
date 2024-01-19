import React from 'react';
import { useParams} from 'react-router-dom';
import { CreatOrJoinRoomPage } from './CreatOrJoinRoomPage';

export const MatrixThree = () => {
  const { roomID } = useParams();
  return (
    <>
    <h1>matrix three</h1>  
    </>
  )
}

