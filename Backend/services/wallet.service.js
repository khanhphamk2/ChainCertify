async function connectToWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask');
        } catch (error) {
            console.error('Connection error:', error);
        }
    } else {
        console.error('MetaMask not found');
    }
}

async function getAccounts() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            console.log('Accounts:', accounts);
        } catch (error) {
            console.error('Error getting accounts:', error);
        }
    } else {
        console.error('MetaMask not found');
    }
}

module.exports = {
    connectToWallet,
    getAccounts
};