/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultProvider, Contract } = require('ethers');
const { abi } = require('../contract/abi.js');
const { config } = require('dotenv');
config();

const address = '0x352F8C1f8576183b6c783D3e589aBB69FfBeBc47';
const provider = getDefaultProvider('https://ethereum-goerli.publicnode.com');
const providerWS = getDefaultProvider(process.env.ALCHEMY_WS_URL);
const contract = new Contract(address, abi, provider);
const contractWS = new Contract(address, abi, providerWS);

module.exports = { contract, contractWS };
