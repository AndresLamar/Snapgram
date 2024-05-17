import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  const [ previousUrl, setPreviousUrl ] = useState('');
  const navigate = useNavigate()

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Abre la modal automáticamente al montar el componente
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    // Limpiar al desmontar el componente
    return () => {
      closeModal();
    };
  }, [closeModal]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target === dialogRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    // Guardar la URL anterior al abrir la modal
    setPreviousUrl(window.location.pathname);

    // Restaurar la URL original al desmontar la modal
    return () => {
      navigate(previousUrl);
    };
  }, []); // Ejecutar solo una vez al montar el componente

  return ( 
    <dialog
      ref={dialogRef}
      className="m-auto h-auto w-auto flex-center text-light-1 overflow-hidden bg-transparent backdrop:bg-dark-4/70 lg:w-full"
      onClick={handleOutsideClick}
    >
        {children}
    </dialog>
  );
};

export default Modal;
