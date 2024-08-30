document.getElementById('stablecoin-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const stablecoinInput = document.getElementById('stablecoin').value.toLowerCase().trim();
    showLoadingScreen(stablecoinInput);
});

function showLoadingScreen(stablecoinInput) {
    const formContainer = document.querySelector('.form-container');
    const loadingContainer = document.getElementById('loading-container');
    const loadingText = document.getElementById('loading-text');
    const loadingText2 = document.getElementById('loading-text-2');
    const resultDiv = document.getElementById('result');
    const infoContainer = document.getElementById('info-container');
    const submitButton = document.querySelector('button[type="submit"]');
    const backButton = document.querySelector('.back-button');

    formContainer.style.display = 'none';
    loadingContainer.style.display = 'flex';
    loadingText.style.display = 'block';
    loadingText2.style.display = 'block';
    submitButton.disabled = true;

    // Ensure the back button is hidden initially
    backButton.style.display = 'none';

    loadingText.textContent = `Fetching ${stablecoinInput.toUpperCase()} total supply...`;
    loadingText2.textContent = `Fetching custodian total minted...`;

    fetchTotalSupply(stablecoinInput).then(totalSupply => {
        if (totalSupply) {
            const custodianMinted = (parseFloat(totalSupply) * 0.95).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            populateData(stablecoinInput, totalSupply, custodianMinted);
            loadingContainer.style.display = 'none';
            resultDiv.style.display = 'flex';
            infoContainer.style.display = 'flex';
            backButton.style.display = 'block';  // Show the back button after the data is fetched
        } else {
            alert('Failed to fetch data. Please try again.');
            resetUI();
        }
    }).catch(error => {
        console.error('Error fetching the data:', error);
        alert('An error occurred. Please try again.');
        resetUI();
    }).finally(() => {
        submitButton.disabled = false;
    });
}

function fetchTotalSupply(stablecoinInput) {
    const endpoints = {
        'tether': 'http://localhost:3000/getUSDT',
        'usd-coin': 'http://localhost:3000/getUSDC',
        'dai': 'http://localhost:3000/getKDAI'
    };

    const url = endpoints[stablecoinInput];

    return fetch(url)
        .then(response => response.text())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching total supply:', error);
            return null;
        });
}

function populateData(stablecoinInput, totalSupply, custodianMinted) {
    // Format the totalSupply and custodianMinted with commas
    const formattedTotalSupply = parseFloat(totalSupply).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedCustodianMinted = custodianMinted;

    // Populate total minted information
    document.getElementById('total-minted').textContent = `${formattedTotalSupply} ${stablecoinInput.toUpperCase()}`;

    // Populate custodian minted information
    document.getElementById('custodian-minted').textContent = `${formattedCustodianMinted} ${stablecoinInput.toUpperCase()}`;
}

function resetUI() {
    const formContainer = document.querySelector('.form-container');
    const loadingContainer = document.getElementById('loading-container');
    const resultDiv = document.getElementById('result');
    const infoContainer = document.getElementById('info-container');
    const backButton = document.querySelector('.back-button');

    formContainer.style.display = 'block';
    loadingContainer.style.display = 'none';
    resultDiv.style.display = 'none';
    infoContainer.style.display = 'none';
    backButton.style.display = 'none';  // Ensure the button is hidden again
}

document.querySelector('.back-button').addEventListener('click', resetUI);
