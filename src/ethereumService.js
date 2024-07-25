
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./config";

// Get the provider
export const getProvider = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access if needed

    // Ensure the network is supported
    const network = await provider.getNetwork();
    console.log("Network name is", network.name);

    if (network.chainId !== 80002) { // Replace with the correct chainId for Polygon-amoy Mumbai (or mainnet if needed)
      console.error("Connected network is not Polygon-amoy!");
      return null;
    }
    return provider;
  } else {
    console.error("MetaMask is not installed!");
    return null;
  }
};

// Get the contract
export const getContract = (provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());
};

// Register user
export const registerUser = async (userAddress, username, publicKey, otpSeed) => {
  const provider = await getProvider();
  console.log("Provider in ethService", provider);

  if (!provider) {
    throw new Error("Provider is not available or network is not Polygon-amoy");
  }

  const contract = getContract(provider);
  const Optseed = Number(otpSeed);

  try {
    const tx = await contract.registerUser(userAddress, username, publicKey, Optseed);
    await tx.wait();
    console.log("User registered!");
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

// Generate OTP
export const generateOTP = async () => {
  const provider = await getProvider();

  if (!provider) {
    throw new Error("Provider is not available or network is not Polygon-amoy");
  }

  const contract = getContract(provider);

  try {
    const tx = await contract.generateOTP(await provider.getSigner().getAddress());
    await tx.wait();
    console.log("OTP generated!");
  } catch (error) {
    console.error("Error generating OTP:", error);
  }
};

// Authenticate user
export const authenticateUser = async (otp) => {
  const provider = await getProvider();

  if (!provider) {
    throw new Error("Provider is not available or network is not Polygon-amoy");
  }

  const contract = getContract(provider);

  try {
    const isAuthenticated = await contract.authenticateUser(await provider.getSigner().getAddress(), otp);
    return isAuthenticated;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};
