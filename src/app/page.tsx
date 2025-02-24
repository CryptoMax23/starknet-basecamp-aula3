'use client';

import React, { useState } from 'react';
import TopInfo from '@/components/TopInfo';
import InputAction from '@/components/InputAction';
import UserInfo from '@/components/UserInfo';
import LoadingPopup from '@/components/LoadingPopup';
import { useAccount, useDisconnect } from '@starknet-react/core';
import contractAbi from '@/abis/aula2_contract.json';
import myTokenAbi from '@/abis/mytoken_conteact.json';

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const erc20 = "0x010adbf91b491b128dfe19c78a11cfe788115a729a9ae33b48bd597e5fd88fb0"
  const contractAddress = "0x0519f5752e4dfe61df291d071736537bd7a201e855e0d98dfe5918fdcc829e07"
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [userName, setUserName] = useState('Usuário');
  const [userBalance, setUserBalance] = useState(0);

  const [userid, setUserId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [withdraw, setWithdraw] = useState('');
  const [valorStaked, setValorStaked] = useState(0);

  // States for Loading Popup
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);
  const [writeIsPending, setWriteIsPending] = useState(false);
  const [waitIsLoading, setWaitIsLoading] = useState(false);
  const [waitData, setWaitData] = useState<any>(null);

  const simulateTransaction = () => {
    setIsLoadingPopupOpen(true);
    setWriteIsPending(true);
    // Simulate write pending
    setTimeout(() => {
      setWriteIsPending(false);
      setWaitIsLoading(true);
      // Simulate waiting for confirmation
      setTimeout(() => {
        setWaitIsLoading(false);
        setWaitData({ statusReceipt: 'confirmed' });
      }, 2000);
    }, 2000);
  };

  const handleAction1 = () => {
    console.log('Ação 1:', input1);
    simulateTransaction();
    // Implemente a função desejada com input1
  };

  const handleAction2 = () => {
    console.log('Ação 2:', input2);
    simulateTransaction();
    // Implemente a função desejada com input2
  };

  const handleAction3 = () => {
    console.log('Ação 3:', input3);
    simulateTransaction();
    // Implemente a função desejada com input3
  };

  const onPopupClose = () => {
    // Reset popup states
    setIsLoadingPopupOpen(false);
    setWriteIsPending(false);
    setWaitIsLoading(false);
    setWaitData(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 font-mono flex flex-col items-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        {/* Topo com total de usuários e balance do contrato */}
        <TopInfo totalUsuarios={totalUsuarios} contractBalance={contractBalance} />
        
        {/* Seção de boas vindas e informações do usuário */}
        <UserInfo userName={userName} account={address} userBalance={userBalance} />
        
        {/* Bloco com 3 inputs e seus respectivos botões */}
        <div className="bg-gray-800 p-6 rounded shadow space-y-4">
          <InputAction
            value={userid}
            placeholder="New Id"
            buttonText="Change ID"
            onChange={(e) => setUserId(e.target.value)}
            onAction={handleAction1}
          />
          <InputAction
            value={deposit}
            placeholder="Amount"
            buttonText="Deposit"
            onChange={(e) => setDeposit(e.target.value)}
            onAction={handleAction2}
          />
          <InputAction
            value={withdraw}
            placeholder="Amount"
            buttonText="Withdraw"
            onChange={(e) => setWithdraw(e.target.value)}
            onAction={handleAction3}
          />
        </div>
        
        {/* Valor staked e botão de disconnect */}
        <div className="flex items-center justify-between space-x-4">
          <p>Staked ERC20: {valorStaked}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-black font-bold px-6 py-3 rounded shadow hover:bg-red-400 transition"
          >
            Disconnect
          </button>
        </div>
      </div>
      
      {/* Loading popup overlay */}
      <LoadingPopup
        isOpen={isLoadingPopupOpen}
        writeIsPending={writeIsPending}
        waitIsLoading={waitIsLoading}
        waitData={waitData}
        onClose={onPopupClose}
      />
    </div>
  );
}
