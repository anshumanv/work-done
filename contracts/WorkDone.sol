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
        address userAddress;
        string info;
        string email;
        bool emailConfirmed;
        Donation[] donationsDone;
        Donation[] donationsRecieved;
    }

    mapping(address => User) public users;

    modifier isOwner() { require(msg.sender == owner); _; }

    modifier verifyCaller (address _address) { require (msg.sender == _address); _;}
    
    constructor() public {
        owner = msg.sender;
    }
    
    function donate(address donateTo, uint amount, string memory message) public payable {
        msg.sender.transfer(msg.value);
        users[donateTo].donationsRecieved.push(Donation({fromAddress: msg.sender, toAddress: donateTo, message: message, value: amount}));
    }
    
    function updateProfile(string memory newUsername, string memory newInfo, string memory newEmail) public returns (string memory, string memory, string memory, address){
        users[msg.sender].userName = newUsername;
        users[msg.sender].info = newInfo;
        users[msg.sender].email = newEmail;
        users[msg.sender].userAddress = msg.sender;
        return (newUsername, newInfo, newEmail, msg.sender);
    }
    
    
    
}