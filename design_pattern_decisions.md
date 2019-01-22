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
