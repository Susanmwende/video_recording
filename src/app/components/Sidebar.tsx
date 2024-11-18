'use client';
import React, { useEffect, useState } from 'react';

// Define an interface for timer items
interface TimerItem {
  icon: string;
  time: number;
  remainingTime: number;
  completed: boolean; // Track if item is completed
}

const Sidebar = ({ selectedItems = [], onItemTimeChange, onItemTimeElapsed }) => {
  const [timers, setTimers] = useState<TimerItem[]>([]); // Specify type here

  // Initialize timers whenever new items are selected
  useEffect(() => {
    if (selectedItems.length > 0) {
      const newTimers: TimerItem[] = selectedItems.map((item) => ({
        ...item,
        remainingTime: item.time || 60, // Start with 60 seconds
        completed: false // Track if item is completed
      }));
      setTimers(newTimers);
    }
  }, [selectedItems]);

  // Countdown timer logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((item, index) => {
          if (item.remainingTime > 0) {
            return { ...item, remainingTime: item.remainingTime - 1 };
          } else {
            onItemTimeElapsed(index); // Notify parent about elapsed time
            return { ...item, remainingTime: item.remainingTime, completed: true }; // Mark as completed
          }
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
    
  }, [onItemTimeElapsed]);

  // Function to handle icon tap to remove it from the sidebar
  const handleIconTap = (index: number) => {
    setTimers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-80 bg-pink-100 p-4 flex flex-col items-center space-y-4 overflow-y-auto" style={{ maxHeight: '80vh', minHeight: '100vh' }}>
      <h2 className="text-lg font-bold text-black">Selected Items</h2>
      {timers.length === 0 && <p className="text-black">No items selected</p>}
      {timers.map((item, index) => (
        <div key={index} 
             className={`relative flex flex-col items-center mb-2 border-4 border-gray-300 rounded-lg p-2 ${item.completed ? 'bg-green-200 opacity-50' : 'bg-white'} shadow-md cursor-pointer`}
             onClick={() => handleIconTap(index)} // Tap to remove
        >
          {item.completed && (
            <div className="absolute top-1 left-1 text-green-600 text-lg">✅</div> // Tick mark for completed
          )}
          <div className={`text-5xl mb-1 ${item.completed ? 'opacity-50' : ''}`}>{item.icon}</div> {/* Bigger icon with dim effect */}
          <div className="text-xl text-black">
            {Math.floor(item.remainingTime / 60)}:{String(item.remainingTime % 60).padStart(2, '0')}
          </div> {/* Timer displaying minutes and seconds */}
          
          {/* Adjustable time input */}
          <input 
            type="number" 
            value={item.time} 
            min={1} 
            onChange={(e) => {
              const newValue = Math.max(1, Number(e.target.value)); // Ensure at least 1 second
              const updatedTimers = [...timers];
              updatedTimers[index].time = newValue;
              updatedTimers[index].remainingTime = newValue; // Reset remaining time
              setTimers(updatedTimers);
              onItemTimeChange(index, newValue); // Notify parent about time change
            }} 
            className="w-20 mt-1 text-center border border-gray-300 rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
