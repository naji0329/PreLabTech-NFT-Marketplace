const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", async function () {
  let owner, address1, address2, address3;
  let Token;
  let hardhatToken;
  
  it("Deployment Tokensr", async function () {
    [owner, address1, address2, address3] = await ethers.getSigners();
    Token = await ethers.getContractFactory("BNBCleverStaking");
    hardhatToken = await Token.deploy();
    console.log("token deployed ", )
  });
  
  it("Deposit", async function () {
    await hardhatToken.deposit(16, address1.address, {
        value: ethers.utils.parseEther("10")
    });

    await hardhatToken.deposit(30, address1.address, {
      value: ethers.utils.parseEther("20")
    });

    await hardhatToken.deposit(30, address1.address, {
      value: ethers.utils.parseEther("20")
    });

    const userInfo = await hardhatToken.userInfo(owner.address);
  });

  it("withdraw", async function () {
    await hardhatToken.withdraw();

    const userInfo = await hardhatToken.userInfo(owner.address);
  });
  it("withdraw", async function () {
    await hardhatToken.withdraw();

    const userInfo = await hardhatToken.userInfo(owner.address);
  });
});