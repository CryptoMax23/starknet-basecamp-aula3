'use client';

import React from 'react';

interface LoadingPopupProps {
  isOpen: boolean;
  writeIsPending: boolean;
  waitIsLoading: boolean;
  waitData?: { statusReceipt: string } | null;
  onClose: () => void;
}

const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center space-x-2">
    <div className="animate-spin">
      <svg
        className="h-5 w-5 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
    <span>{message}</span>
  </div>
);

export const LoadingPopup: React.FC<LoadingPopupProps> = ({
  isOpen,
  writeIsPending,
  waitIsLoading,
  waitData,
  onClose,
}) => {
  if (!isOpen) return null;

  const buttonContent = () => {
    if (writeIsPending) {
      return <LoadingState message="Mint..." />;
    }

    if (waitIsLoading) {
      return <LoadingState message="Waiting for confirmation..." />;
    }

    if (waitData && waitData.statusReceipt === 'rejected') {
      return <LoadingState message="Transaction rejected..." />;
    }

    if (waitData) {
      return 'Transaction confirmed';
    }

    return 'Mint';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg space-y-4 w-80">
        <div className="text-center text-green-500 font-mono text-xl font-bold">
          Processing Transaction
        </div>
        <div className="text-center">{buttonContent()}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-500 text-black font-bold px-4 py-2 rounded hover:bg-green-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoadingPopup;
