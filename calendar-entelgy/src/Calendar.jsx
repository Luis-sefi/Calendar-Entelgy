import React, { useState, useMemo } from 'react';
import MonthSelector from './MonthSelector';
import EventPopup from './EventPopup';

const Calendar = () => {
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [hoveredDay, setHoveredDay] = useState(null);

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = useMemo(() => getDaysInMonth(date.getMonth(), date.getFullYear()), [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTogglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleAddEvent = (event) => {
    if (selectedDay) {
      const dayString = selectedDay.toDateString();
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dayString]: [...(prevEvents[dayString] || []), event],
      }));
    }
  };

  const handleClosePopup = () => {
    setSelectedDay(null);
  };

  const handleRemoveEvent = (date, index) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[date].splice(index, 1); 
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      return updatedEvents;
    });
  };

  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const daysInNextMonth = 7 - lastDayOfMonth - 1;
  
  const days = useMemo(() => {
    const prevMonthDays = [];
    const currentMonthDays = [];
    const nextMonthDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDate = new Date(date.getFullYear(), date.getMonth(), -i);
      prevMonthDays.unshift(prevMonthDate);
    }

    currentMonthDays.push(...daysInMonth);

    for (let i = 1; i <= daysInNextMonth; i++) {
      const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, i);
      nextMonthDays.push(nextMonthDate);
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [date, daysInMonth, firstDayOfMonth, lastDayOfMonth]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative text-center">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePreviousMonth}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none"
            aria-label="Previous month"
          >
            &lt;
          </button>
          <button
            onClick={handleTogglePicker}
            className="text-2xl font-bold focus:outline-none"
          >
            {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </button>
          <button
            onClick={handleNextMonth}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none"
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>
        {showPicker && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <MonthSelector
              date={date}
              onDateChange={handleDateChange}
              onClose={handleClosePicker}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mb-2 bg-blue-50">
        {weekDays.map((day, index) => (
          <div key={index} className="font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === date.getMonth();
          const dayString = day.toDateString();
          const hasEvents = events[dayString] && events[dayString].length > 0;

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => setHoveredDay(dayString)}
              onMouseLeave={() => setHoveredDay(null)}
              className={`p-2 text-center cursor-pointer ${
                isCurrentMonth
                  ? hasEvents
                    ? 'bg-green-500 text-white rounded-full'
                    : day.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth()
                    ? 'bg-blue-500 text-white rounded-full'
                    : ''
                  : 'text-gray-300'
              }`}
            >
              {day.getDate()}
              {hasEvents && hoveredDay === dayString && (
                <span className="ml-1 text-sm text-white bg-red-500 rounded-full px-2">{events[dayString].length}</span>
              )}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <EventPopup
          selectedDay={selectedDay}
          events={events}
          onAddEvent={handleAddEvent}
          onRemoveEvent={handleRemoveEvent}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Calendar;
