const StringStore = artifacts.require("StringStore");
const WorkDone = artifacts.require("WorkDone");

module.exports = function(deployer) {
  deployer.deploy(StringStore);
  deployer.deploy(WorkDone);
}
