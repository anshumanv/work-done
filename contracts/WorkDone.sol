pragma solidity >=0.4.22 <0.6.0;

contract WorkDone {
    
    address owner;
    
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
        // Donation[] donationsRecieved;
        // Donation[] donationsGiven;
    }

    mapping(address => User) public users;

    modifier isOwner() { require(msg.sender == owner); _; }

    modifier verifyCaller (address _address) { require (msg.sender == _address); _;}
    
    constructor() public {
        owner = msg.sender;
    }
    
    function donate(address donateTo, uint amount, string memory message) public payable {
        msg.sender.transfer(msg.value);
        // users[donateTo].donationsRecieved.push(Donation({fromAddress: msg.sender, toAddress: donateTo, message: message, value: amount}));
    }
    
    function updateProfile(string memory newUsername, string memory newInfo, string memory newEmail) public returns (string memory, string memory, string memory, address){
        users[msg.sender].userName = newUsername;
        users[msg.sender].info = newInfo;
        users[msg.sender].email = newEmail;
        return (newUsername, newInfo, newEmail, msg.sender);
    }
    
    function createUser(string memory newUsername, string memory newInfo, string memory newEmail) public {
        users[msg.sender] = User({
            userName: newUsername,
            email: newEmail,
            info: newInfo,
            userAddress: msg.sender,
            emailConfirmed: false
            // donationsRecieved: new Donation[](0),
            // donationsGiven: new Donation[](0)
        });
    }
    
    function getUserName() view public returns (string memory username) {
        username = users[msg.sender].userName;
    }
    
}