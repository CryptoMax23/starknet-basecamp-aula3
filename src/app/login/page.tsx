'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConnectWalletButton from '@/components/ConnectWalletButton';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // if (false) {
    //   router.push('/');
    // }
  }, [ router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-500 font-mono">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Starknet Last Class</h1>
        <ConnectWalletButton />
      </div>
    </div>
  );
}
