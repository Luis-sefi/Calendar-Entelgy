import React, { useState } from 'react';
import './styles/EventPopup.css';

const EventPopup = ({ selectedDay, events, onAddEvent, onClose, onRemoveEvent }) => {
  const [newEvent, setNewEvent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEvent = () => {
    if (newEvent.trim() !== '') {
      onAddEvent(newEvent);
      setNewEvent('');
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-64 relative">
        <h2 className="text-lg font-bold mb-2 flex justify-between items-center">
          {selectedDay.toDateString()}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </h2>

        {isAdding ? (
          <div className="mb-4">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded mr-2 mt-4"
              placeholder="Ej: Reu REACT"
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {events[selectedDay.toDateString()] && events[selectedDay.toDateString()].length > 0 ? (
              <div>
                <p className="mb-2">Eventos:</p>
                <ul className="list-none p-0">
                  {events[selectedDay.toDateString()].map((event, index) => (
                    <li key={index} className="event-item flex items-center mb-1">
                      <span className="event-text">- {event}</span>
                      <button
                        onClick={() => onRemoveEvent(selectedDay.toDateString(), index)}
                        className="text-red-500 focus:outline-none hover:bg-red-100 rounded mr-2 w-4.5 h-5"
                        aria-label="Eliminar evento"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="mb-2">No hay eventos</p>
              </div>
            )}
            <div className="flex justify-center mt-7">
              <button
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Agregar evento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPopup;
