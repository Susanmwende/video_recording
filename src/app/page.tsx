'use client';
import React, { useState } from 'react';
import KnittingUI from './components/KnittingUI';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import Sidebar from './components/Sidebar';

// Dynamically import Palette with SSR disabled
const Palette = dynamic(() => import('./components/Palette'), { ssr: false });

export default function Home() {
  const [showPalette, setShowPalette] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Store selected items

  // Toggle function for showing/hiding the palette
  const togglePalette = () => {
    setShowPalette((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar 
        selectedItems={selectedItems} 
        onItemTimeChange={(index, time) => console.log(`Item ${index} time changed to ${time}`)}
        onItemTimeElapsed={(index) => console.log(`Item ${index} time elapsed`)}
      />
      <div className="flex-1">
        <KnittingUI 
          togglePalette={togglePalette} 
          selectedItems={selectedItems} // Pass selected items to KnittingUI
        />

        {/* Conditionally render the Palette component */}
        {showPalette && (
          <Palette 
            onIconSelect={(icon) => setSelectedItems((prev) => [...prev, { icon, time: 30 }])} // Add new icon with default time
          />
        )}
      </div>
    </div>
  );
}
