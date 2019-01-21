const WorkDone = artifacts.require("./WorkDone.sol")


contract('WorkDone', accounts => {
  
  const user1 = accounts[0]
  const user2 = accounts[1]
  
  // A test to create a user
  it('should create a user', async () => {
    // Instance of the deployed contract
    const workDone = await WorkDone.deployed()

    // Call the createUser function to save the user info in the blockchain
    await workDone.createUser('user1', 'I watch anime', 'user1@user1.com', {from: user1});

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
    
    // Create a user to be updated later
    await workDone.createUser('user1', 'I watch anime', 'user1@user1.com', {from: user1});

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



})
