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
        uint donationsRecieved;
        uint donationsGiven;
    }

    mapping(address => User) public users;

    modifier isOwner() { require(msg.sender == owner); _; }

    modifier verifyCaller (address _address) { require (msg.sender == _address); _;}
    
    constructor() public {
        owner = msg.sender;
    }
    
    function donate(address donateTo) public payable {
        address payable targetAddress = address(uint160(donateTo));
        targetAddress.transfer(msg.value);
        users[donateTo].donationsRecieved += msg.value;
        users[msg.sender].donationsGiven += msg.value;
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
            emailConfirmed: false,
            donationsRecieved: 0,
            donationsGiven: 0
        });
    }
    
    function getUserName() view public returns (string memory username) {
        username = users[msg.sender].userName;
    }
    
}