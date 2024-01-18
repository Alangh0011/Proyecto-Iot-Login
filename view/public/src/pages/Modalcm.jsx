import React, { useEffect, useState } from 'react';

const Modalcm = ({ isOpen, onClose, data }) => {
  const [backgroundColor, setBackgroundColor] = useState('');

  // Efecto para determinar el color de fondo basado en la data
  useEffect(() => {
    console.log('Data:', data);
    if (data !== null) {
      if (data <= 4) {
        console.log('Setting background color to green');
        setBackgroundColor('bg-green-500');
      } else if (data >= 5 && data <= 7) {
        console.log('Setting background color to yellow');
        setBackgroundColor('bg-yellow-500');
      } else {
        console.log('Setting background color to red');
        setBackgroundColor('bg-red-500');
      }
    }
  }, [data]);
  

  // Función para cerrar el modal
  const closeModal = () => {
    setBackgroundColor('bg-green-500'); // Reiniciar el color al cerrar el modal
    onClose();
    console.log('Modal cerrado');
  };

  // Estilos de Tailwind CSS para el modal
  const modalStyles = `
    fixed inset-0 overflow-y-auto flex items-center justify-center
    ${isOpen ? 'visible' : 'invisible'}
  `;

  const modalContentStyles = `
  p-4 rounded shadow-md z-10 ${backgroundColor}
  `;

  return (
    <div>
      {/* Capa de bloqueo */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>}

      {/* Contenido del modal con color de fondo dinámico */}
      <div className={modalStyles}>
        <div className={modalContentStyles}>
          {data !== null ? (
            <>
              <p className='text-white'>Valor de Data: {data} cm</p>
              <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Cerrar
              </button>
            </>
          ) : (
            <p>Obteniendo datos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modalcm;
