import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setIsModalOpen(true);
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveModal(null);
  };

  return (
    <GlobalContext.Provider value={{
      isModalOpen,
      setIsModalOpen,
      activeModal,
      setActiveModal,
      openModal,
      closeModal,
      isChatOpen,
      setIsChatOpen
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext); 