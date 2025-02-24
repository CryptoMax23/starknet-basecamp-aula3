'use client';

import React, { useState } from 'react';
import TopInfo from '@/components/TopInfo';
import InputAction from '@/components/InputAction';
import UserInfo from '@/components/UserInfo';
import { useAccount, useDisconnect } from '@starknet-react/core';

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const account = '0x1234567890123456789012345678901234567890';
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [userName, setUserName] = useState('Usuário');
  const [userBalance, setUserBalance] = useState(0);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [valorStaked, setValorStaked] = useState(0);

  const handleAction1 = () => {
    console.log('Ação 1:', input1);
    // Implemente a função desejada com input1
  };

  const handleAction2 = () => {
    console.log('Ação 2:', input2);
    // Implemente a função desejada com input2
  };

  const handleAction3 = () => {
    console.log('Ação 3:', input3);
    // Implemente a função desejada com input3
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
            value={input1}
            placeholder="New Id"
            buttonText="Change ID"
            onChange={(e) => setInput1(e.target.value)}
            onAction={handleAction1}
          />
          <InputAction
            value={input2}
            placeholder="Amount"
            buttonText="Deposit"
            onChange={(e) => setInput2(e.target.value)}
            onAction={handleAction2}
          />
          <InputAction
            value={input3}
            placeholder="Amount"
            buttonText="Withdraw"
            onChange={(e) => setInput3(e.target.value)}
            onAction={handleAction3}
          />
        </div>
        
        {/* Valor staked */}
        <div className="flex items-center justify-between space-x-4">
          <p>Staked ERC20: {valorStaked}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-black font-bold px-6 py-3 rounded shadow hover:bg-red-400 transition"
          >
            Disconnect
          </button>
        </div>
        
        {/* Botão para sair da conta */}
        <div className="text-center mt-8">
          
        </div>
      </div>
    </div>
  );
}
