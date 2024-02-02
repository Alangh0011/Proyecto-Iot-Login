import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Importa la función io para establecer la conexión con el servidor de Socket.IO
import Modal from "./Modal"; // Importa el componente Modal
import Modalcm from './Modalcm'; // Importa el componente Modalcm
import InstructionsItem from './InstructionsItem'; // Importa el componente InstructionsItem para mostrar las instrucciones

/**
 * Componente funcional que representa el contenido de la página de inicio.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {string} props.user - Nombre de usuario actual.
 * @returns {JSX.Element} Componente de React que representa el contenido de la página de inicio.
 */
const Contenido_Home = ({ user }) => {
  const socket = io(); // Inicializa una instancia de Socket.IO

  // Estados para controlar la apertura y cierre de los modales, y para almacenar la distancia de las croquetas
  const [modalOpen, setModalOpen] = useState(false);
  const [distance, setDistance] = useState(5);
  const [modalcmOpen, setModalcmOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Efecto para manejar el evento 'connected' emitido desde el servidor
  useEffect(() => {
    socket.on('connected', (message) => {
      console.log(message);
    });
  }, [socket]);

  // Función para obtener los datos de la cantidad de croquetas
  const onGetData = async () => {
    setModalcmOpen(true);
    try {
      const response = await fetch('/getDistance'); // Realiza la solicitud GET al servidor
      const data = await response.json(); // Obtiene los datos en formato JSON
      document.getElementById('Distancia').innerText = `${data.quality} cm de croquetas para el contenedor`; // Actualiza la información en la interfaz de usuario
      setDistance(data.quality); // Actualiza el estado de la distancia
    } catch (error) {
      console.error('Error al obtener los datos del sensor de distancia:', error); // Muestra un mensaje de error en la consola en caso de error
    }
  };

  // Función para obtener la acción de girar
  const onGetGirar = async () => {
    openModal(true);
    try {
        const response = await fetch('/getGirar'); // Realiza la solicitud GET al servidor
        const data = await response.json(); // Obtiene los datos en formato JSON
        document.getElementById('Abrir').innerText = `${data.quality}`; // Actualiza la información en la interfaz de usuario
    } catch (error) {
        console.error('Error al mandar la peticion', error); // Muestra un mensaje de error en la consola en caso de error
    }
  };

  // Renderiza la interfaz de usuario del contenido de la página de inicio
  return (
    <div className="w-full px-10 py-20 relative mt-8">
      <div className="border-gradient-to-tr border-2 border-solid border-transparent rounded-xl overflow-hidden relative">
        <div className="bg-primary p-8 relative z-10">
          <h1 className="mt-8 text-5xl font-semibold">Hola {user} bienvenido a CroqueFeed</h1>
          <h2 className="mt-8 text-3xl font-semibold">Instrucciones de uso:</h2>
          <ol className='list-decimal mt-8'>
            {/* Componentes InstructionsItem para mostrar las instrucciones */}
            <InstructionsItem
              title="Encendido del Dispensador"
              content={[
                'Conecta el dispensador de croquetas a una fuente de alimentación eléctrica.',
                'Asegúrate de que la conexión a Internet esté establecida para garantizar el funcionamiento de la interfaz web.',
              ]}
            />
            <InstructionsItem
              title="Controles del Dispensador"
              content={[
                'Verás dos botones principales: "Abrir Compuerta" y "Ver Croquetas".',
                'Utiliza el botón "Abrir Compuerta" para dispensar croquetas manualmente. Presiona el botón y observa cómo se abre la compuerta durante un tiempo predeterminado.',
                'Utiliza el botón "Ver Croquetas" para obtener información sobre la cantidad actual de croquetas en el contenedor.',
              ]}
            />
            <InstructionsItem
              title="Monitoreo de Croquetas"
              content={[
                'La sección "Ver Croquetas" mostrará la cantidad actual de croquetas en el contenedor.',
                'Asegúrate de revisar regularmente este valor para conocer el nivel de croquetas y tomar decisiones informadas sobre la recarga.',
              ]}
            />
          </ol>
          {/* Elemento para mostrar la distancia de las croquetas */}
          <div className='mt-8 flex justify-center items-center'>
            <p className='font-medium text-base'>Le faltan: <span id="Distancia">--</span></p>
          </div>
          {/* Botón para obtener la cantidad de croquetas */}
          <div className='mt-8 flex justify-center items-center'>
            <button
              onClick={onGetData}
              className="w-80 active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">VER CANTIDAD DE CROQUETAS</button>
          </div>
          {/* Botón para abrir la compuerta */}
          <div className='mt-8 flex justify-center items-center'>
            <button
              onClick={onGetGirar}
              className="w-80 active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">ABRIR COMPUERTA</button>
          </div>
        </div>
      </div>
      {/* Modal para mostrar la acción de girar */}
      <Modal isOpen={modalOpen} onClose={closeModal} />
      {/* Modal para mostrar la cantidad de croquetas */}
      <Modalcm isOpen={modalcmOpen} onClose={() => setModalcmOpen(false)} data={distance} />
    </div>
  );
};

export default Contenido_Home; // Exporta el componente Contenido_Home
