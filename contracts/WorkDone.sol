pragma solidity >=0.4.22 <0.6.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/** @title Work Done. */
contract WorkDone is Ownable {

    // Freezing state of the contract
    bool public frozen = false;
    
    // Structs
    struct Donation {
        address fromAddress;
        address toAddress;
        string message;
        uint value;
    }
    
    struct User {
        string userName;
        string info;
        address userAddress;
        string email;
        bool emailConfirmed;
        uint donationsRecieved;
        uint donationsGiven;
    }

    // State variables
    mapping(address => User) public users;

    mapping(address => bool) public registered;

    // Function Modifiers

    // Modifier to check if an address is registered
    modifier isRegistered(address _address) { require(registered[_address]); _; }

    // Modifier to verify caller with a given address
    modifier verifyCaller (address _address) { require (msg.sender == _address); _;}

    // Modifiers in emergency
    modifier stopInEmergency { require(!frozen); _; }
    modifier onlyInEmergency { require(frozen); _; }


    // Events
    event userCreated(address _address);
    event userUpdated(address _address);
    event userDeleted(address _address);
    event donationDone(address from, address to, uint amount);
    event toggleFreeze();

    // Constructor
    constructor () public {
        createUser('owner', 'Owner of this DApp', 'owner@owner.com');
    }
    

    /** @dev A function to donate a user
      * @param donateTo Address of the user to donate to.
      * @return status Whether the donation was successful.
      */
    function donate(address donateTo) stopInEmergency public payable returns(bool status) {
        // Check that the user is registered
        require(registered[donateTo], 'User that you\'re trying to support isn\'t registered');

        // Type conversion a little
        address payable targetAddress = address(uint160(donateTo));

        // Execute the transaction
        targetAddress.transfer(msg.value);

        // Update the donation amounts of both users i.e given and recieved
        users[donateTo].donationsRecieved += msg.value;
        users[msg.sender].donationsGiven += msg.value;

        // Emit the donation event
        emit donationDone(donateTo, msg.sender, msg.value);

        return status;
    }
    
    /** @dev Update profile of a registered user
      * @param newUsername Username to be changed to.
      * @param newInfo Updated information about the user.
      * @param newEmail Updated email of the user.
      * @return status Whether the profile was updated.
      */
    function updateProfile(string memory newUsername,
        string memory newInfo,
        string memory newEmail)
        stopInEmergency
        isRegistered(msg.sender)
        public
        returns (bool status){
        
        // Update the user details after checking that the user exists
        users[msg.sender].userName = newUsername;
        users[msg.sender].info = newInfo;
        users[msg.sender].email = newEmail;

        // Emit the updated event
        emit userUpdated(msg.sender);
        
        return true;
    }
    
    /** @dev Creates a new user.
      * @param newUsername Username of the user.
      * @param newInfo Information/Description about the user.
      * @param newEmail Email of the user.
      * @return status Whether the user was created.
      */
    function createUser(string memory newUsername,
                        string memory newInfo,
                        string memory newEmail)
                        stopInEmergency public returns (bool status) {
        
        // Check that the user doesn't exist already 
        require(!registered[msg.sender], 'User is already registered');

        // Create the user using the User struct
        users[msg.sender] = User({
            userName: newUsername,
            email: newEmail,
            info: newInfo,
            userAddress: msg.sender,
            emailConfirmed: false,
            donationsRecieved: 0,
            donationsGiven: 0
        });

        // Save the entry in registered users
        registered[msg.sender] = true;

        // Emit the User created event
        emit userCreated(msg.sender);

        return true;
    }

    /** @dev A function to delete a user, can only be performed by the contract owner
      * @param target address of the user to be deleted.
      * @return status Whether the user was deleted.
      */
    function deleteUser(address target) public onlyOwner returns(bool status) {
        // Check if the user is registered
        require(registered[target], 'User is not registered');

        // Remove the user
        delete users[target];
        registered[target] = false;

        // Emit the user deleted event
        emit userDeleted(target);

        return true;
    }

    /** @dev A function to get username of a registered user
      * @return username Username of the queried user address.
      */
    function getUserName() view public isRegistered(msg.sender) returns (string memory username) {
        // Return the username simply
        username = users[msg.sender].userName;
    }

    /** @dev A function to flip the emergency status of this contract, useful when a bug is detected
      * @return status Whether the frozen status was successfully split.
      */
    function flipFreeze() private onlyOwner returns(bool success) {
        if(frozen) {
            frozen = false;
        } else frozen = true;
        return true;
    }
    
}