'use client';

import React from 'react';

interface InputActionProps {
  value: string;
  placeholder: string;
  buttonText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction: () => void;
}

export default function InputAction({ value, placeholder, buttonText, onChange, onAction }: InputActionProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 rounded flex-1 bg-gray-700 text-green-500"
      />
      <button
        onClick={onAction}
        className="bg-green-500 text-black font-bold px-4 py-2 rounded hover:bg-green-400 transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
