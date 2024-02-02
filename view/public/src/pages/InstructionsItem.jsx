import React, { useState } from 'react';

/**
 * Componente funcional que representa un elemento de instrucciones.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {string} props.title - Título de las instrucciones.
 * @param {string[]} props.content - Contenido de las instrucciones.
 * @returns {JSX.Element} Componente de React que representa un elemento de instrucciones.
 */
const InstructionsItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si las instrucciones están abiertas o cerradas

  // Función para alternar entre abrir y cerrar las instrucciones
  const toggleInstructions = () => {
    setIsOpen(!isOpen);
  };

  // Renderiza el elemento de instrucciones
  return (
    <li>
      {/* Div para mostrar el título de las instrucciones y el ícono de flecha para indicar si están abiertas o cerradas */}
      <div className="flex items-center cursor-pointer mt-8" onClick={toggleInstructions}>
        <p className='text-x1 font-bold'>{title}</p>
        <div className="ml-auto">
          {/* Renderiza el ícono de flecha hacia abajo si las instrucciones están abiertas, y hacia la derecha si están cerradas */}
          {isOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
        </div>
      </div>
      {/* Renderiza el contenido de las instrucciones si están abiertas */}
      {isOpen && (
        <ul className='list-disc text-[16px] mt-2 mb-2 ml-4'>
          {/* Mapea y renderiza cada elemento del contenido de las instrucciones */}
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default InstructionsItem; // Exporta el componente InstructionsItem
