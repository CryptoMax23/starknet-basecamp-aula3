'use client';

import React from 'react';

interface TopInfoProps {
  totalUsuarios: number;
  contractBalance: number;
}

export default function TopInfo({ totalUsuarios, contractBalance }: TopInfoProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-green-500">
      <div>Total Users: {totalUsuarios}</div>
      <div>Contract Balance: {contractBalance}</div>
    </div>
  );
}
