// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

/**
 * when we emit an event, there are two types of parameters: indexed (up to 3. There vars are called topics) and non-indexed. Indexed variables are easyier to query.  To decode non-indexed vars we need the abi
 * Emitting an event results in storing the data into the logging data structure of the EVM. This is more gas efficient than storing the data in the smart contract (storage) as this data structure is not accessible to smart contracts.
 * To emit an event: declare the event `event storedNumber(...)`, and then `emit storedNumber(values...)`
 * events are tied to the smart contracts (their address) that emitted them
 */
