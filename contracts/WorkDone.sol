pragma solidity >=0.4.22 <0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

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

    mapping(address => uint) private balances;

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
      * @return status Whether the donation was successful and user balance is updated.
      */
    function donate(address donateTo) public payable stopInEmergency returns(bool status) {
        // Check that the user is registered
        require(registered[donateTo], "User that you\'re trying to support isn\'t registered");
        require(msg.value > 1, "Value of the transaction should be greater than 1 wei");
        require(donateTo != address(0), "User is not registered");
        
        uint amount = msg.value;

        balances[donateTo] += amount;

        // Update the donation amounts of both users i.e given and recieved
        users[donateTo].donationsRecieved += amount;
        users[msg.sender].donationsGiven += amount;

        // Emit the donation event
        emit donationDone(donateTo, msg.sender, msg.value);

        return status;
    }
    
    /** @dev A function for registered users to withdraw their funds.
      * @return status Whether the withdraw was successful.
      */
    function withdraw() public returns(bool success) {
        require(balances[msg.sender] > 0, "You do not have sufficient balance ot withdraw");
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
        return true;
    }

    /** @dev Update profile of a registered user
      * @param newUsername Username to be changed to.
      * @param newInfo Updated information about the user.
      * @param newEmail Updated email of the user.
      * @return status Whether the profile was updated.
      */
    function updateProfile(string memory newUsername, string memory newInfo, string memory newEmail)
                            public
                            isRegistered(msg.sender)
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
                        stopInEmergency
                        public returns (bool status) {
        // Check that the user doesn't exist already 
        require(!registered[msg.sender], "User is already registered");

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
        require(registered[target], "User is not registered");

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
    function getUserName() public view isRegistered(msg.sender) returns (string memory username) {
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

    /** @dev A function to destroy the contract and transfer all funds to the owner
      * @return status Whether the frozen status was successfully destroyed.
      */
    function kill() private onlyOwner returns(bool status) {
        selfdestruct(msg.sender);
        return true;
    }
    
}