import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Metamask from "../assets/icons/metamask.svg";

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Kiểm tra xem Ethereum Provider có khả dụng không
      if (window.ethereum) {
        // Yêu cầu quyền truy cập ví từ người dùng
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // accounts[0] chứa địa chỉ Ethereum của người dùng sau khi kết nối thành công
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        console.log("Connected with address:", walletAddress);
      } else {
        console.log("MetaMask is not available.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/about-us" className="flex items-center">
          About Us
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/get" className="flex items-center">
          Certificates
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/guide" className="flex items-center">
          Guide
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto w-full py-2 px-4 mt-4 lg:px-8 lg:py-4 from-blue-gray-900 to-blue-gray-800 rounded-full"
    >
      <div className="container mx-auto flex items-center justify-between white">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          ChainCertify
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          color="white"
          className="flex items-center gap-3 rounded-full"
          onClick={connectWallet}
        >
          {walletAddress !== "" ? (
            <>
              <span>{walletAddress.substring(0, 15)}...</span>
              <img src={Metamask} alt="metamask" className="h-6 w-6" />
            </>
          ) : (
            <>
              <img src={Metamask} alt="metamask" className="h-6 w-6" />
              <span>Connect Wallet</span>
            </>
          )}
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Header;
