App = {
    web3Provider: null,
    contracts: {},

    init: async function(){
        return await App.initWeb3();
    },

    initWeb3: async function(){
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
            // Request account access
            await ethereum.request({method: 'eth_requestAccounts'});
            } catch (error) {
            // User denied account access...
            console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function(){
        $.getJSON('Inbox.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            const artifact = data;
            App.contracts.Inbox = TruffleContract(artifact);
          
            // Set the provider for contract
            App.contracts.Inbox.setProvider(App.web3Provider);
          
            // Use contract to retrieve message
            return App.getMessage();
        });
        return App.bindEvent();
    },

    bindEvent: function(){
        //Listen for submit event on the html form
        $('#set-msg').submit(function(event){
            event.preventDefault();
            // Get input value
            const $input = $('#set-msg :input').val()
            // Pass input value to setMessage func
            App.setMessage($input);
        });
    },

    getMessage: async function(){
        // create smart contract instance 
        const instance = await App.contracts.Inbox.deployed();
        // retrieve message
        const message = await instance.message.call()
        //display message to UI
        $('#msg-display').html(message);
        
    },

    setMessage: function(message){
        // Get user accounts
        web3.eth.getAccounts( async (error, accts) => {
            if(error) console.log(error);
            const instance = await App.contracts.Inbox.deployed()
            // Set a new message by requesting a transaction from users first account;
            await instance.setMessage(message, {from: accts[0]});
            // Update message to UI
            return App.getMessage();
        });
        
    }
}

$(function() {
    $(window).load(function() {
      App.init();
    });
});