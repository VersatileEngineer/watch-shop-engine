const express = require('express');
const router = express.Router();
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const TestTokenABI = require('../../abi/TestTokenABI.json'); // Replace with your TestToken ABI

const web3 = createAlchemyWeb3('https://eth-sepolia.g.alchemy.com/v2/6skMy9cfTZ9eZK58tkZ4QsOrCwcVkS3e'); // Initialize Web3 with your Ethereum node URL
const testTokenAddress = '0xC4Da6398Aa93F5c525C872cbcFB744884433BB2a'; // Replace with your TestToken contract address

router.get(
    '/:wallet_address',
    async ({ params: { wallet_address } }, res) => {
        try {

            // Validate Ethereum address
            if (!web3.utils.isAddress(wallet_address)) {
                return res.status(400).json({ error: 'Invalid Ethereum address' });
            }

            const testTokenContract = new web3.eth.Contract(TestTokenABI, testTokenAddress);

            // Get Test token balance for the provided address
            const balance = await testTokenContract.methods.balanceOf(wallet_address).call();

            res.json({ wallet_address, balance });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
)

module.exports = router;