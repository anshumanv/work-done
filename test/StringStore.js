const StringStore = artifacts.require("./StringStore.sol");

contract("StringStore", accounts => {
  it("Should store the input string in the contract", async () => {
    const stringStore = await StringStore.deployed();

    await stringStore.set("Ohayouu", { from: accounts[0] });

    const storedString = await stringStore.myString.call()

    assert.equal(storedString, 'Ohayouu', "The string was not stored");
  });
});
