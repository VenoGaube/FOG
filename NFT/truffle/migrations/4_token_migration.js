const BoardToken = artifacts.require("BoardToken");

module.exports = function (deployer) {
  deployer.deploy(BoardToken);
};
