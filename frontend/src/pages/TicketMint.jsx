import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther, parseEther } from "viem";
import { TicketABI, TicketAddress } from '../constants';
import axios from "axios";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

const TicketMint = () => {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amountInETH, setAmountInETH] = useState("");
  const [pauseVal, setPauseVal] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [tokenData , setTokenData] = useState("");
  const { data: hash, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: tokenURI } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const { data: totalSupply } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "totalSupply",
  });
  console.log("totalSupply",totalSupply);

  const { data: tokenIds } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "tokenIds",
  });
  console.log("tokenIds",tokenIds);


  const { data: ownerOf } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "ownerOf",
    args: [tokenId],
  });

  const { data: owner } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "owner",
  });

  const { data: maxTokenIds } = useReadContract({
    abi: TicketABI,
    address: TicketAddress,
    functionName: "maxTokenIds",
  });

  const MintTicket = async () => {
    setLoading(true);
    try {
      await writeContract({
        abi: TicketABI,
        address: TicketAddress,
        functionName: "mint",
        value: [parseEther(amountInETH)],
      });
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
    setLoading(false);
    setAmountInETH("");
  };

  const Pause = async () => {
    setLoading(true);
    try {
      await writeContract({
        abi: TicketABI,
        address: TicketAddress,
        functionName: "setPaused",
        args: [!pauseVal],
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setPauseVal(true);
  };

  const Withdraw = async () => {
    setLoading(true);
    try {
      await writeContract({
        abi: TicketABI,
        address: TicketAddress,
        functionName: "withdraw",
      });
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
    setLoading(false);
  };

  async function getJson() {
    try {
      const response = await axios.get(tokenURI);
      const jsonData = response.data; // assuming the JSON data is in response.data
      console.log(jsonData);
      setTokenData(jsonData);
    } catch (error) {
      console.error("Error fetching the token URI:", error);
      return null;
    }
  }

  console.log(tokenData.image)
  useEffect(() => {
    setIsMounted(true);
    getJson()
   
  }, [tokenId]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-pink-700 flex flex-col items-center justify-center text-white px-6">
    {/* Connect Wallet Button */}
    <ConnectButton />
  
    {isConnected && (
      <div className="ticket-mint-section mt-8 p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-pink-600 to-pink-800 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-center">
          Get Your Ticket
        </h1>
  
        {/* Input for Amount in ETH */}
        <input
          type="text"
          value={amountInETH}
          onChange={(e) => setAmountInETH(e.target.value)}
          placeholder="Enter amount in MATIC"
          className="w-full mb-6 p-3 rounded-xl border border-white bg-pink-700 text-white focus:ring-2 focus:ring-pink-400 outline-none"
        />
  
        {/* Mint Button */}
        <button
          onClick={MintTicket}
          disabled={loading}
          className={`w-full mb-4 px-5 py-3 rounded-xl font-bold bg-white text-pink-600 hover:bg-pink-100 transition-colors ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? "Minting..." : "Get Ticket"}
        </button>

  { owner == address &&(
    <>
    {/* Pause/Unpause Button */}
    <button
    onClick={Pause}
    disabled={loading}
    className={`w-full mb-4 px-5 py-3 rounded-xl font-bold bg-white text-pink-600 hover:bg-pink-100 transition-colors ${
      loading ? 'cursor-not-allowed opacity-50' : ''
    }`}
  >
    {loading ? "Processing..." : pauseVal ? "Unpause Contract" : "Pause Contract"}
  </button>

  {/* Withdraw Button */}
  <button
    onClick={Withdraw}
    disabled={loading}
    className={`w-full mb-4 px-5 py-3 rounded-xl font-bold bg-white text-pink-600 hover:bg-pink-100 transition-colors ${
      loading ? 'cursor-not-allowed opacity-50' : ''
    }`}
  >
    {loading ? "Withdrawing..." : "Withdraw Funds"}
  </button>
  </>
  )}
        
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Enter Token Id"
          className="w-full mb-6 p-3 rounded-xl border border-white bg-pink-700 text-white focus:ring-2 focus:ring-pink-400 outline-none"
        />
       
       <div className="token-info mt-8 p-8 rounded-xl bg-pink-900 shadow-lg">
      {tokenData ? (
        ownerOf === address ? (
          <>
            {/* Event Image */}
            <img
  src={tokenData.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")}
  alt={tokenData.name}
  className="w-full h-64 object-cover rounded-lg mb-6"
/>

            {/* Event Name */}
            <h2 className="text-3xl font-bold mb-4">{tokenData.name}</h2>

            {/* Event Description */}
            <p className="text-lg mb-4">{tokenData.description}</p>

            {/* Event Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {/* Event Date */}
              <div className="p-4 bg-pink-800 rounded-lg">
                <p className="text-lg font-semibold">Event Date</p>
                <p className="text-xl font-bold">{tokenData.attributes[0].value}</p>
              </div>

              {/* Location */}
              <div className="p-4 bg-pink-800 rounded-lg">
                <p className="text-lg font-semibold">Location</p>
                <p className="text-xl font-bold">{tokenData.attributes[1].value}</p>
              </div>

              {/* Seat Number */}
              <div className="p-4 bg-pink-800 rounded-lg">
                <p className="text-lg font-semibold">Seat Number</p>
                <p className="text-xl font-bold">{tokenData.attributes[2].value}</p>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold text-red-400">
            You don't own the ticket with this ID
          </h2>
        )
      ) : (
        <h2 className="text-2xl font-bold text-red-400">No token data available</h2>
      )}
    </div>

      </div>
    )}
  </div>
  
  );
};

export default TicketMint;
