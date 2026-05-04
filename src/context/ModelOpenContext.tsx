import { createContext, useState } from 'react';
import type { ReactNode  } from 'react';

interface ModelOpenContextType {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export const ModelOpenContext = createContext<ModelOpenContextType | undefined>(undefined);

interface ModelOpenProviderProps {
  children: ReactNode;
}

export const ModelOpenProvider = ({ children }: ModelOpenProviderProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <ModelOpenContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModelOpenContext.Provider>
  );
};
