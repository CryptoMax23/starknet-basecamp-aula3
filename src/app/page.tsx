"use client";

import React, { useState, useMemo, useEffect } from "react";
import TopInfo from "@/components/TopInfo";
import InputAction from "@/components/InputAction";
import UserInfo from "@/components/UserInfo";
import LoadingPopup from "@/components/LoadingPopup";
import { useAccount, useCall, useDisconnect } from "@starknet-react/core";
import contractAbi from "@/abis/aula2_contract.json";
import myTokenAbi from "@/abis/mytoken_conteact.json";
import { useContract, useSendTransaction } from "@starknet-react/core";
import { type Abi } from "starknet";
import { BigNumberish } from "starknet";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const erc20 =
    "0x010adbf91b491b128dfe19c78a11cfe788115a729a9ae33b48bd597e5fd88fb0";
  const contractAddress =
    "0x0519f5752e4dfe61df291d071736537bd7a201e855e0d98dfe5918fdcc829e07";
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [userName, setUserName] = useState("Usuário");
  const [userBalance, setUserBalance] = useState(0);

  const [userid, setUserId] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [valorStaked, setValorStaked] = useState(0);

  // States for Loading Popup
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);

  const abi: Abi = contractAbi.abi;
  const contract = useContract({
    abi: abi,
    address: contractAddress,
  });

  const tokenAbi: Abi = myTokenAbi.abi;
  const myToken = useContract({
    abi: tokenAbi,
    address: erc20,
  });

  const { data: dataContractBal } = useCall({
    abi: abi,
    functionName: "contractBalance",
    address: contractAddress,
    args: [],
  });

  const { data: dataTotalUsers } = useCall({
    abi: abi,
    functionName: "get_users_count",
    address: contractAddress,
    args: [],
  });

  const calls1 = useMemo(() => {
    if (!address || !contract) return [];

    return [
      contract.contract!.populateTransaction["register_user"]!(
        contractAddress,
        {
          user_id: userid,
        }
      ),
    ];
  }, [contract, address, userid, contract.contract]);

  const calls2 = useMemo(() => {
    if (!address || !contract) return [];
    const decimals = 18; // Número de casas decimais do token (verifique no contrato!)
    const amountInWei = BigInt(deposit ? deposit * 10 ** 18 : 0); // Assumindo 18 casas decimais

    // return contract.populateTransaction["approve"]!(contractAddress,{ low: (amount ? amount : 0), high: 0 });
    return [
      myToken.contract!.populateTransaction["approve"]!(contractAddress, {
        low: amountInWei ? amountInWei : 0,
        high: 0,
      }),
      contract.contract!.populateTransaction["deposity"]!({
        low: amountInWei ? amountInWei : 0,
        high: 0,
      }),
    ];
  }, [contract, address, deposit, myToken.contract]);

  const calls3 = useMemo(() => {
    if (!address || !contract) return [];
    const decimals = 18; // Número de casas decimais do token (verifique no contrato!)
    const amountInWei = BigInt(withdraw ? withdraw * 10 ** 18 : 0); // Assumindo 18 casas decimais

    // return contract.populateTransaction["approve"]!(contractAddress,{ low: (amount ? amount : 0), high: 0 });
    return [
      contract.contract!.populateTransaction["withdraw"]!({
        low: amountInWei ? amountInWei : 0,
        high: 0,
      }),
    ];
  }, [contract, address, withdraw, myToken.contract]);

  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({
    calls: calls1,
  });

  const {
    send: writeDeposty,
    data: writeDeposityData,
    isPending: writeDeposityIsPending,
  } = useSendTransaction({
    calls: calls2,
  });

  const {
    send: writeWithdraw,
    data: writeWithdrawData,
    isPending: writeWithdrawIsPending,
  } = useSendTransaction({
    calls: calls3,
  });

  const handleAction1 = async () => {
    writeAsync();
  };

  const handleAction2 = () => {
    writeDeposty();
  };

  const handleAction3 = () => {
    writeWithdraw();
  };

  const onPopupClose = () => {
    // Reset popup states
    setIsLoadingPopupOpen(false);
  };

  useEffect(() => {
    if (dataContractBal) {
      const bal = Number(dataContractBal) / 10 ** 18;
      setContractBalance(bal);
    }
    if (dataTotalUsers) {
      setTotalUsuarios(Number(dataTotalUsers));
    }
  }, [dataContractBal, dataTotalUsers]);

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 font-mono flex flex-col items-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        {/* Topo com total de usuários e balance do contrato */}
        <TopInfo
          totalUsuarios={totalUsuarios}
          contractBalance={contractBalance}
        />

        {/* Seção de boas vindas e informações do usuário */}
        <UserInfo
          userName={userName}
          account={address}
          userBalance={userBalance}
        />

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
            value={deposit.toString()}
            placeholder="Amount"
            buttonText="Deposit"
            onChange={(e) => setDeposit(Number(e.target.value))}
            onAction={handleAction2}
          />
          <InputAction
            value={withdraw.toString()}
            placeholder="Amount"
            buttonText="Withdraw"
            onChange={(e) => setWithdraw(Number(e.target.value))}
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
      {/* <LoadingPopup
        isOpen={isLoadingPopupOpen}
        writeIsPending={writeIsPending}
        waitIsLoading={true}
        waitData={''}
        onClose={onPopupClose}
      /> */}
    </div>
  );
}
