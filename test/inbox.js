const Inbox = artifacts.require("Inbox");

contract("Inbox", function(accounts){
    it("test set message", async function() {
        const instance = await Inbox.deployed();
        const setMess = await instance.setMessage('How are you doing', {from: accounts[1]});
        
        assert.ok(setMess, 'Message was not set');
    });
    it("test get message", async function() {
        const instance = await Inbox.deployed();
        const message = await instance.message.call();
        console.log(`Your message is ${message}`);
        assert.equal(message, 'How are you doing');
    });
});