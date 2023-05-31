// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Campaign is ERC20, Ownable {
    using SafeMath for uint256;

    uint256 public id;
    string public description;
    uint256 public fundingGoal;
    uint256 public duration;
    uint256 public balance;
    mapping(address => uint256) public contributors;
    uint256 public contributorsCount;
    uint256 public endTime;
    uint256 public reward;
    mapping(address => bool) public claimedRewards;
    uint256 previousBalance;

    event UserContributed(address indexed contributor, uint256 amount);
    event ContributorRefunded(address indexed contributor, uint256 amount);
    event ContributorClaimedReward(address indexed contributor, uint256 amount);

    constructor(
        uint256 _id,
        string memory _name,
        string memory _symbol,
        string memory _description,
        uint256 _duration,
        uint256 _fundingGoal,
        uint256 _initialSupply,
        address _creator
    ) ERC20(_name, _symbol) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_symbol).length > 0, "Symbol required");
        require(bytes(_description).length > 0, "Description required");
        require(_fundingGoal > 0, "Goal > 0");
        require(_duration > 0, "Duration > 0");

        id = _id;
        description = _description;
        duration = _duration;
        endTime = block.timestamp + duration;
        fundingGoal = _fundingGoal;

        transferOwnership(_creator);
        _mint(address(this), _initialSupply);
    }

    modifier onlyActive() {
        require(block.timestamp < endTime, "Campaign ended");
        _;
    }

    modifier onlyInactive() {
        require(block.timestamp >= endTime, "Campaign not ended");
        _;
    }

    modifier onlyContributor() {
        require(contributors[msg.sender] > 0, "User not contributed");
        _;
    }

    function contribute() external payable onlyActive {
        require(msg.value > 0, "Value > 0");
        require(msg.value + balance <= fundingGoal, "Exceeding funding goal");

        if (contributors[msg.sender] == 0) {
            contributorsCount++;
        }

        balance += msg.value;
        contributors[msg.sender] += msg.value;

        emit UserContributed(msg.sender, msg.value);
    }

    function releaseFunds() external onlyOwner onlyActive {
        require(balance == fundingGoal, "Balance = funding goal");

        previousBalance = balance;

        balance = 0;

        (bool success, ) = payable(owner()).call{value: previousBalance}("");

        require(success, "Release funds failed");
    }

    function refund() external payable onlyContributor onlyInactive {
        require(balance > 0, "Balance > 0");
        require(balance < fundingGoal, "Funding goal reached");

        uint256 contribution = contributors[msg.sender];

        contributors[msg.sender] = 0;
        balance -= contribution;

        (bool success, ) = payable(msg.sender).call{value: contribution}("");

        require(success, "Refund failed");

        emit ContributorRefunded(msg.sender, contribution);
    }

    function rewardDistribution(uint256 amount) external onlyOwner {
        require(reward == 0, "Reward distributed");
        require(amount > 0, "Amount > 0");
        require(amount <= totalSupply(), "Amount <= total supply");
        require(contributorsCount > 0, "No contributors");
        require(block.timestamp >= endTime, "Campaign not ended");

        reward = amount;
    }

    function claimReward() external onlyContributor {
        require(reward > 0, "No reward to claim");
        require(!claimedRewards[msg.sender], "Contributor claimed reward");

        uint256 contribution = contributors[msg.sender];
        uint256 contributionPercentage = contribution.mul(100).div(
            previousBalance
        );
        uint256 contributorReward = reward.mul(contributionPercentage).div(100);

        claimedRewards[msg.sender] = true;

        _transfer(address(this), msg.sender, contributorReward);

        emit ContributorClaimedReward(msg.sender, contributorReward);
    }
}