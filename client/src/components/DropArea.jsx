import React, { useState } from 'react';

const DropArea = () => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div 
      onDragEnter={() => setShowDrop(true)} 
      onDragLeave={() => setShowDrop(false)} 
      className={`p-2 rounded-lg mt-3 ${showDrop ? 'border border-gray-50 block transition-all ease-in-out duration-500' : 'opacity-0'}`}
    >
      <h1 className='text-white text-sm text-center'>DropHere</h1>
    </div>
  );
}

export default DropArea;
