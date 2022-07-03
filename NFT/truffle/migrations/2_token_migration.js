const AuthorToken = artifacts.require("AuthorToken");

module.exports = function (deployer) {
  deployer.deploy(AuthorToken);
};
