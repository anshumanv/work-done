pragma solidity >=0.4.22 <0.6.0;

/** @title Work Done. */
contract WorkDone {
    
    // Contract owner
    address owner;
    
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
    modifier isOwner() { require(msg.sender == owner); _; }

    modifier isRegistered(address _address) { require(registered[_address]); _; }

    modifier verifyCaller (address _address) { require (msg.sender == _address); _;}

    // Events
    event userCreated(address _address);
    event userUpdated(address _address);
    event userDeleted(address _address);
    event donationDone(address from, address to, uint amount);

    // Constructor
    constructor () public {
        owner = msg.sender;
    }
    

    /** @dev A function to donate a user
      * @param donateTo Address of the user to donate to.
      */
    function donate(address donateTo) public payable {
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
    }
    
    /** @dev Update profile of a registered user
      * @param newUsername Username to be changed to.
      * @param newInfo Updated information about the user.
      * @param newEmail Updated email of the user..
      */
    function updateProfile(string memory newUsername, string memory newInfo, string memory newEmail) public isRegistered(msg.sender) returns (string memory, string memory, string memory, address){
        // Update the user details after checking that the user exists
        users[msg.sender].userName = newUsername;
        users[msg.sender].info = newInfo;
        users[msg.sender].email = newEmail;

        // Emit the updated event
        emit userUpdated(msg.sender);

        // Return the updated details
        return (newUsername, newInfo, newEmail, msg.sender);
    }
    
    /** @dev Creates a new user.
      * @param newUsername Username of the user.
      * @param newInfo Information/Description about the user.
      * @param newEmail Email of the user.
      */
    function createUser(string memory newUsername, string memory newInfo, string memory newEmail) public {
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
    }

    /** @dev A function to delete a user, can only be performed by the contract owner
      * @param target address of the user to be deleted.
      */
    function deleteUser(address target) public isOwner() {
        // Check if the user is registered
        require(registered[target], 'User is not registered');

        // Remove the user
        delete users[target];
        registered[target] = false;

        // Emit the user deleted event
        emit userDeleted(msg.sender);
    }

    /** @dev A function to get username of a registered user
      */
    function getUserName() view public isRegistered(msg.sender) returns (string memory username) {
        // Return the username simply
        username = users[msg.sender].userName;
    }
    
}