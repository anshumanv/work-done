const WorkDone = artifacts.require("./WorkDone.sol")


contract('WorkDone', accounts => {
  
  const owner = accounts[0]
  const user1 = accounts[1]
  const user2 = accounts[2]
  const testUser = accounts[3]
  
  // A test to create a user
  it('should create a user', async () => {
    // Instance of the deployed contract
    const workDone = await WorkDone.deployed()

    // Call the createUser function to save the user info in the blockchain
    await workDone.createUser('user1', 'I watch anime', 'user1@user1.com', {from: user1});
    await workDone.createUser('user2', 'I read manga', 'user2@user2.com', {from: user2});

    // Get the created user
    const userData = await workDone.users.call(user1)
    
    // console.log(userData)
    
    // Destructure the details of the created user
    const { userName, info, userAddress, email, donationsRecieved, donationsGiven } = userData

    // Run assertions for all the user fields and verify correctness
    assert.equal(user1, userAddress, 'Address of the created user is incorrect')
    assert.equal('user1', userName, 'Username of the created user is incorrect')
    assert.equal(email, 'user1@user1.com', 'Email of the created user is incorrect')
    assert.equal(info, 'I watch anime', 'Info of the created user is incorrect')
    assert.equal(0, donationsRecieved, 'Donation recieved by the created user is incorrect')
    assert.equal(0, donationsGiven, 'Donation given by the created user is incorrect')
  });

  // A test to donate some amount to a user
  it('should update the profile of a user', async () => {
    // Instance of the deployed contract
    const workDone = await WorkDone.deployed()

    // Call the update profile function to update the info of the user
    await workDone.updateProfile('natsu', 'I read manga', 'anime@cool.com', { from: user1 })

    // Get the updated user
    const userData = await workDone.users.call(user1)
    
    // console.log(userData)
    
    // Destructure the details of the updated user
    const { userName, info, userAddress, email, donationsRecieved, donationsGiven } = userData

    // Run assertions for all the user fields and verify correctness
    assert.equal(user1, userAddress, 'Address of the updated user is incorrect')
    assert.equal(userName, 'natsu', 'Username of the updated user is incorrect')
    assert.equal(email, 'anime@cool.com', 'Email of the updated user is incorrect')
    assert.equal(info, 'I read manga', 'Info of the updated user is incorrect')
  });


  // A test to check if a user with an address exists or not
  it('should check if a user of an address exists or not', async () => {
    // Get instance of deployed contract
    const workDone = await WorkDone.deployed()

    // Initially the user doesn't exist
    let userExists = await workDone.registered(testUser, { from: testUser })

    // Assertion to check that a user doesn't exist
    assert.equal(userExists, false, 'User should not exist')
     
    // User should exists now
    userExists = await workDone.registered(user2, { from: user2 })
    
    // Assertion to check that user exists now
    assert.equal(userExists, true, 'User should exist')

  });

  it('should donate correct amount to a user' , async () => {
    // Get instance of the deployed contract
    const workDone = await WorkDone.deployed()

    // user1 is generous and like the work from user2 and hence decides to donate
    await workDone.donate(user2, {
      from: user1,
      value: 1000000
    })

    // Get the created user
    const userData1 = await workDone.users.call(user1) 
    const userData2 = await workDone.users.call(user2) 


    // Check if the amount sent is recieved by the target
    assert.equal(userData2.donationsRecieved.toString(), '1000000', 'User did not recieve the correct amount')
    assert.equal(userData1.donationsGiven.toString(), '1000000', 'Amount in donation given is not correct')

  })

  // A test for contract owner to be able to delete a user
  it('owner should delete a user', async () => {
    // Get the contract instance
    const workDone = await WorkDone.deployed()

    // Delete user2
    await workDone.deleteUser(user2, { from: owner })

    // User should no longer be registered
    const userExists = await workDone.registered(user2)
    assert.equal(userExists, false, 'Failed to delete the user!')
  })

})
