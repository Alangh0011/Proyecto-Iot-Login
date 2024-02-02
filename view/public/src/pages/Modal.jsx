import React, { useEffect, useState } from 'react';

/**
 * Componente funcional que representa un modal para mostrar el proceso de abrir la compuerta.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @returns {JSX.Element} Componente de React que representa un modal.
 */
const Modal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(7); // Estado para el contador de la cuenta regresiva

  // Efecto para actualizar el contador cada segundo y cerrar el modal después de 30 segundos
  useEffect(() => {
    let intervalId;

    if (isOpen) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
      setCountdown(7); // Reiniciar el contador al cerrar el modal
    };
  }, [isOpen]);

  // Efecto para cerrar el modal después de 30 segundos
  useEffect(() => {
    if (countdown === 0) {
      onClose(); // Cierra el modal cuando el contador llega a cero
    }
  }, [countdown, onClose]);

  // Estilos de Tailwind CSS para el modal y la capa de bloqueo
  const modalStyles = `
    fixed inset-0 overflow-y-auto
    flex items-center justify-center z-50
    ${isOpen ? 'visible' : 'invisible'} // Aplica la visibilidad según el estado isOpen
  `;

  const blockingLayerStyles = `
    fixed inset-0 bg-black bg-opacity-70 z-40
    ${isOpen ? 'visible' : 'invisible'} // Aplica la visibilidad según el estado isOpen
  `;

  // Renderiza el componente del modal
  return (
    <div>
      {/* Capa de bloqueo */}
      <div className={blockingLayerStyles} onClick={onClose}></div>

      {/* Contenido del modal */}
      <div className={modalStyles}>
        <div className="bg-green-600 p-4 rounded shadow-md">
          <p className='text-x1 font-bold'>Espere se está abriendo la compuerta....</p>
          <p>Cuenta regresiva: {countdown} segundos</p>
        </div>
      </div>
    </div>
  );
};

export default Modal; // Exporta el componente Modal
