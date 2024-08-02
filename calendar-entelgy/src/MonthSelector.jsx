import React from 'react';

const MonthSelector = ({ date, onDateChange, onClose }) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const years = Array.from({ length: 10 }, (_, index) => date.getFullYear() - 5 + index); 

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    const newDate = new Date(date.getFullYear(), newMonth, 1);
    onDateChange(newDate);
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    const newDate = new Date(newYear, date.getMonth(), 1);
    onDateChange(newDate);
  };

  const handleAccept = () => {
    onClose();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{months[date.getMonth()]} {date.getFullYear()}</h2>
        <button onClick={onClose} className="text-lg font-bold">
          x
        </button>
      </div>
      <div className="flex items-center">
        <label htmlFor="month-select" className="sr-only">Select month</label>
        <select
          id="month-select"
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          value={date.getMonth()}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <label htmlFor="year-select" className="sr-only">Select year</label>
        <select
          id="year-select"
          className="px-2 py-1 border border-gray-300 rounded"
          value={date.getFullYear()}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={handleAccept} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
