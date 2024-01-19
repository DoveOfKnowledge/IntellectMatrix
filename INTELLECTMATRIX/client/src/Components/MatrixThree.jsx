import React from 'react';
import { useParams} from 'react-router-dom';

export const MatrixThree = () => {
  const { roomID } = useParams();
  return (
    <>
    <h1>matrix three</h1>  
    </>
  )
}

