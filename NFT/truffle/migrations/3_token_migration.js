const ReviewerToken = artifacts.require("ReviewerToken");

module.exports = function (deployer) {
  deployer.deploy(ReviewerToken);
};
