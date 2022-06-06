const DecenterJournalToken = artifacts.require("DecenterJournalToken");

module.exports = function (deployer) {
  deployer.deploy(DecenterJournalToken);
};
