const WorkDone = artifacts.require("WorkDone");

module.exports = function(deployer) {
  deployer.deploy(WorkDone);
}
