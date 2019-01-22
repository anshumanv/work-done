## Design Pattern Decisions

### Restricting Access
- Only the owner of contract can delete users.
- Owner of the contract can freeze the contract in case something goes wrong.
- Owner of the contract has access to delete the contract from the blockchain and all the contract funds will then be transferred to his address.


### Pull over Push Payments
Withdrawl pattern is used as it protects against re-entrancy and denial of service attacks.


### Events and Logs
Every time a user is created or updated or deleted or a donation is made and event is fired which can be catched at the frontend to make it more interactive and improve the UX.


### Circuit Breaker
In the bugs are detected the owner of the contract can freeze the contract till the bug is resolved.

### Fail early and fail loud
There are no silent errors in the contract and all the require statements are passed an error message so we can know precisely where and why the function execution stopped, functions return a bool status using which we can know whether the function executed properly or not.


### Auto Deprecation
I don't want the contract to expire as it stores the donation stats of users so this is not implemented.

### State Machine
I didn't find the need for states while writing this SC so this is not needed.

