import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(7);

  // Efecto para actualizar el contador cada segundo y cerrar el modal después de 30 segundos
  useEffect(() => {
    let intervalId;

    if (isOpen) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      setCountdown(7); // Reiniciar el contador al cerrar el modal
    };
  }, [isOpen]);

  // Efecto para cerrar el modal después de 30 segundos
  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  // Estilos de Tailwind CSS para el modal y la capa de bloqueo
  const modalStyles = `
    fixed inset-0 overflow-y-auto
    flex items-center justify-center 
    ${isOpen ? 'visible' : 'invisible'}
  `;

  const blockingLayerStyles = `
    fixed inset-0 bg-opacity-50
    ${isOpen ? 'visible' : 'invisible'}
  `;

  return (
    <div>
      {/* Capa de bloqueo */}
      <div className={blockingLayerStyles} onClick={onClose}></div>

      {/* Contenido del modal */}
      <div className={modalStyles}>
        <div className="bg-green-600 p-4 rounded shadow-md z-10">
          <p className='text-x1 font-bold'>Espere se esta abriendo la compuerta....</p>
          <p>Cuenta regresiva: {countdown} segundos</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
