'use client';

import Image from "next/image";
import React, { useState } from 'react';
import { Connector, useConnect } from "@starknet-react/core";

const loader = ({ src }: { src: string }) => {
    return src;
  };

const Wallet = ({
    name,
    alt,
    src,
    connector,
    onClose,
  }: {
    name: string;
    alt: string;
    src: string;
    connector: Connector;
    onClose: () => void;
  }) => {
    const { connect } = useConnect();
    const isSvg = src?.startsWith("<svg");
  
    function handleConnectWallet(): void {
      connect({ connector });
      onClose();
    }
  
    return (
      <button
        className="hover:bg-gray-900 flex cursor-pointer items-center gap-4 p-2 text-start transition-all hover:rounded-[10px]"
        onClick={() => handleConnectWallet()}
      >
        <div className="h-[2.2rem] w-[2.2rem] rounded-[5px]">
          {isSvg ? (
            <div
              className="h-full w-full rounded-[5px] object-cover"
              dangerouslySetInnerHTML={{
                __html: src ?? "",
              }}
            />
          ) : (
            <Image
              alt={alt}
              loader={loader}
              unoptimized
              src={src}
              width={70}
              height={70}
              className="h-full w-full rounded-[5px] object-cover"
            />
          )}
        </div>
        <p className="flex-1">{name}</p>
      </button>
    );
  };

export default function ConnectWalletButton() {
  const [showModal, setShowModal] = useState(false);
  const { connectors } = useConnect();


  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-black font-bold px-6 py-3 rounded shadow hover:bg-green-400 transition"
      >
        {'Conectar Carteira'}
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-green-500 font-mono p-6 rounded shadow-lg space-y-4">
            <h2 className="text-2xl font-bold">Selecione um Connector</h2>
            <div className="flex flex-col gap-4 py-8">
              {connectors.map((connector, index) => (
                <Wallet
                  key={connector.id || index}
                  src={connector.icon}
                  name={connector.name}
                  connector={connector}
                  alt="alt"
                  onClose={() => setShowModal(false)}
                />
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm underline hover:text-green-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
