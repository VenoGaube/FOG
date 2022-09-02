const web3 = new Web3(Web3.givenProvider);

$(document).ready(function () {
    $("button.eth-connect").click(async function () {
        if (typeof ethereum === "undefined") {
            alert("Failed to connect: MetaMask is not installed.");
            return;
        }
        await ethereum.request({method: "eth_requestAccounts"}).then(redirectIfConnected).catch(console.error);
    });

    if (typeof ethereum !== "undefined") {
        ethereum.request({method: 'eth_accounts'}).then(redirectIfConnected).catch(console.error);
    }

});

function redirectIfConnected(accounts) {
    if (accounts.length !== 0) {
        window.location = "/journal/my-papers";
    }
}