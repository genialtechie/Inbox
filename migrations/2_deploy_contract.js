const Inbox = artifacts.require("Inbox");

module.exports = async function (deployer) {
  await deployer.deploy(Inbox, 'Welcome');
};