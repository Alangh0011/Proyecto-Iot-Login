// InstructionsItem.jsx
import React, { useState } from 'react';

const InstructionsItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div className="flex items-center cursor-pointer mt-8" onClick={() => setIsOpen(!isOpen)}>
        <p className='text-x1 font-bold'>{title}</p>
        <div className="ml-auto">
          {isOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
        </div>
      </div>
      {isOpen && (
        <ul className='list-disc text-[16px] mt-2 mb-2 ml-4'>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default InstructionsItem;
