document.addEventListener('DOMContentLoaded', function () {
    showLoadingScreen();

    const endpoints = {
        'usdt': 'http://localhost:3000/getUSDT',
        'usdc': 'http://localhost:3000/getUSDC',
        'dai': 'http://localhost:3000/getKDAI'
    };

    const fetchAndDisplayData = async (endpoint, mintedElementId, collateralElementId, txHashElementId) => {
        try {
            const response = await fetch(endpoint);
            const totalMinted = await response.text();
            const custodianCollateral = Math.floor(0.95 * parseFloat(totalMinted)).toLocaleString(); // Removed decimal places

            document.getElementById(mintedElementId).textContent = parseFloat(totalMinted).toLocaleString();
            document.getElementById(collateralElementId).textContent = custodianCollateral;
            
            // Display a simulated TX-Hash
            const simulatedTxHash = '0x' + Math.random().toString(16).substr(2, 16);
            document.getElementById(txHashElementId).textContent = simulatedTxHash;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchAndDisplayData(endpoints['usdt'], 'total-minted-usdt', 'custodian-collateral-usdt', 'tx-hash-usdt');
    fetchAndDisplayData(endpoints['usdc'], 'total-minted-usdc', 'custodian-collateral-usdc', 'tx-hash-usdc');
    fetchAndDisplayData(endpoints['dai'], 'total-minted-dai', 'custodian-collateral-dai', 'tx-hash-dai');

    setTimeout(() => {
        document.getElementById('loading-container').style.display = 'none';
        document.getElementById('result').style.display = 'flex';
        document.querySelector('.back-button').style.display = 'block';
    }, 3000); // Adjust the timeout to ensure data loads properly
});

function showLoadingScreen() {
    const loadingContainer = document.getElementById('loading-container');
    if (loadingContainer) {
        loadingContainer.style.display = 'flex';
        document.getElementById('spinner').style.display = 'block'; // Show spinner
    } else {
        console.error('Loading container not found!');
    }
}
