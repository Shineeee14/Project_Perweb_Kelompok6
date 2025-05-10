import React from 'react';

const CategoryButton = ({ icon, label, active }) => {
  return (
    <button
      style={{
        backgroundColor: active ? '#007bff' : '#e0e0e0',
        color: active ? 'white' : 'black',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        margin: '0 5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      <span style={{ marginRight: '8px' }}>{icon}</span>
      {label}
    </button>
  );
};

export default CategoryButton;
