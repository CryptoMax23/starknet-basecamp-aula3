'use client';

import React from 'react';

interface UserInfoProps {
  userName: string;
  account?: string;
  userBalance: number;
}

export default function UserInfo({ userName, account, userBalance }: UserInfoProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Hello {userName}, welcome to the last starknet class !</h1>
      <p className="mt-2">Wallet Address: {account || 'Não conectado'}</p>
      <p>User Id: {userName}</p>
      <p>User Balance: {userBalance}</p>
    </div>
  );
}
