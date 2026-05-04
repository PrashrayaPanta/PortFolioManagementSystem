import { useContext } from 'react';
import { ModelOpenContext } from '../context/ModelOpenContext';

export const useModelOpen = () => {
  const context = useContext(ModelOpenContext);
  if (!context) {
    throw new Error('useModelOpen must be used within ModelOpenProvider');
  }
  return context;
};
