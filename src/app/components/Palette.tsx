import React, { useState } from 'react';

const Palette = ({ onIconSelect }) => {
  const categories = [
    {
      id: 'agriculture',
      title: 'Agriculture',
      icon: '🌾',
      icons: [
        '🚜', '🌻', '👨‍🌾', '🐄', '🍎', '🥕', '🌽', '🐑', '🐓', '🍇',
        '🍞', '🌿', '🍠', '🧄', '🧅', '🍒', '🍓', '🥭', '🥥', '🍋',
        '🍉', '🍊', '🍍', '🥬', '🥒', '🧑‍🌾', '🍑', '🌸', '🌷', '🥔'
      ],
    },
    {
      id: 'modeling',
      title: 'Modeling (Clay)',
      icon: '🏺',
      icons: [
        '🎨', '🖌️', '🧱', '🖼️', '🧑‍🎨', '🧑‍🏭', '🎭', '👩‍🎨', '🧑‍🎤', '🎬',
        '🖍️', '🖊️', '🧶', '🧵', '📐', '📏', '🎴', '✂️', '🧩', '🖼️',
        '🎭', '🧑‍🎨', '🎨', '🖌️', '🎨', '🧑‍🏭', '🎭', '🧩', '🖍️', '📐'
      ],
    },
    {
      id: 'environment',
      title: 'Environment',
      icon: '🌍',
      icons: [
        '🌱', '🍃', '🌳', '♻️', '💧', '🌤', '🌊', '🏞', '🦜', '🌿',
        '🌵', '🍂', '🌾', '🏔', '🌋', '🍄', '🦋', '🪲', '🐝', '🐛',
        '🐞', '🦚', '🌸', '🌷', '🍀', '🐾', '🐦', '🦥', '🍁', '🦥'
      ],
    },
    {
      id: 'art_and_craft',
      title: 'Art and Craft',
      icon: '✂️',
      icons: [
        '✂️', '🧵', '🖍️', '🧷', '🧩', '📏', '🖊️', '📐', '🖌️', '🧶',
        '🧑‍🎨', '🎨', '🎭', '🎬', '🎨', '🧑‍🏭', '🧩', '📏', '📐', '🎴',
        '📎', '📓', '🖇', '📖', '🧵', '🖼', '🖍', '🎭', '🧷', '📚'
      ],
    },
    {
      id: 'knitting',
      title: 'Knitting',
      icon: '🧶',
      icons: [
        '🧣', '🧷', '👕', '🧤', '🧢', '🧦', '🧵', '👒', '👗', '👚',
        '🧥', '👔', '👘', '🧤', '🧵', '🧷', '🧣', '🧦', '🧑‍🎨', '🧥',
        '🧑‍🎨', '🧤', '🧣', '🧶', '✂️', '📏', '🧑‍🎨', '📐', '📎', '🧵'
      ],
    },
    {
      id: 'cooking',
      title: 'Cooking',
      icon: '🍳',
      icons: [
        '🍔', '🥘', '🍕', '🍜', '🍱', '🍝', '🥗', '🍲', '🍰', '🍣',
        '🍤', '🍩', '🥞', '🍴', '🍇', '🍧', '🍮', '🍫', '🍿', '🥐',
        '🍔', '🍟', '🍖', '🍗', '🥓', '🍞', '🍍', '🍤', '🔪', '🍴', '🥄', 
        '🍽', '🧂', '🍶', '🍯', '🍶', '🥢', '🍚', '🫖', '🍵'
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const activeCategory = categories.find((cat) => cat.id === selectedCategory);
  
  return (
    <div 
      className="bg-pink-100 text-white rounded-lg shadow-lg p-4 w-full h-auto" // Full width and auto height
      style={{ margin: 0, padding: 0 }} // Remove any default margins/padding
    >
      <h2 className="text-xl font-bold text-center mb-3">Select an Icon</h2>
      
      {/* Category Selection */}
      <div className="flex justify-around mb-3 bg-pink-100 w-full"> {/* Ensure full width */}
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center cursor-pointer p-2 rounded-lg 
              ${category.id === selectedCategory ? 'bg-[#644877]' : 
                'bg-[#A083C9] hover:bg-[#644877]'}`}
            onClick={() => handleCategoryChange(category.id)}
            style={{ width: '10%' }}  // Keep this for category items
          >
            <span className="text-6xl">{category.icon}</span>
            <span className="text-md font-medium">{category.title}</span>
          </div>
        ))}
      </div>
  
      {/* Icons Grid */}
      <div className="grid grid-cols-5 gap-4 bg-pink-100 w-full"> {/* Full width for icons grid */}
        {activeCategory.icons.map((icon, index) => (
          <div
            key={index}
            className="text-center bg-pink-200 cursor-pointer p-4 rounded-lg transition-colors duration-200 
              hover:bg-[#644877]"
            onClick={() => onIconSelect(icon)} // Call function to add icon
          >
            <span className="text-5xl">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  };
  
export default Palette;
