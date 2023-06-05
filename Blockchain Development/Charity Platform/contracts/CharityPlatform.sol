// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

contract CharityPlatform {
    struct Campaign {
        uint256 id;
        string name;
        string description;
        uint256 fundingGoal;
        uint256 deadline;
        uint256 currentFunding;
        bool isOpen;
        address creator;
        address[] donors;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donations;

    uint256 public campaignsCount;

    event CampaignCreated(
        uint indexed id,
        string name,
        string description,
        uint fundingGoal,
        uint deadline
    );
    event FundsCollected(
        uint indexed id,
        address indexed receiver,
        uint amount
    );
    event FundRefunded(uint indexed id, address indexed recipient, uint amount);

    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _deadline
    ) public {
        require(bytes(_name).length > 0, "Campaign name cannot be empty");
        require(
            bytes(_description).length > 0,
            "Campaign description cannot be empty"
        );
        require(
            _fundingGoal > 0,
            "Campaign funding goal must be greater than 0"
        );
        require(_deadline > 0, "Campaign deadline must be greater than 0");

        campaignsCount++;

        campaigns[campaignsCount] = Campaign({
            id: campaignsCount,
            name: _name,
            description: _description,
            fundingGoal: _fundingGoal,
            deadline: _deadline,
            currentFunding: 0,
            isOpen: true,
            creator: msg.sender,
            donors: new address[](0)
        });
    }

    function donateFunds(uint256 _id, uint256 amount) public payable {
        Campaign storage campaign = campaigns[_id];

        require(campaign.isOpen, "Campaign is not open");
        require(
            campaign.deadline > block.timestamp,
            "Campaign deadline has passed"
        );
        require(
            campaign.currentFunding + amount <= campaign.fundingGoal,
            "Campaign funding goal has been reached"
        );

        campaign.currentFunding += amount;
    }

    function collectFunds(uint256 _id, address _receiver) public {
        require(
            _id > 0 && _id <= campaignsCount,
            "Invalid campaign identifier"
        );

        Campaign storage campaign = campaigns[_id];
        require(campaign.isOpen, "Campaign is not open");
        require(
            campaign.creator == msg.sender,
            "Only campaign creator can collect funds"
        );

        if (
            campaign.currentFunding >= campaign.fundingGoal ||
            campaign.deadline <= block.timestamp
        ) {
            uint256 amountToCollect = campaign.currentFunding;
            campaign.currentFunding = 0;
            campaign.isOpen = false;

            (bool success, ) = payable(_receiver).call{value: amountToCollect}(
                ""
            );
            require(success, "Failed to send funds");

            emit FundsCollected(_id, _receiver, amountToCollect);
        }
    }

    function refundFunds(uint256 _id) public {
        require(
            _id > 0 && _id <= campaignsCount,
            "Invalid campaign identifier"
        );

        Campaign storage campaign = campaigns[_id];
        require(campaign.isOpen == false, "Campaign is still open");
        require(
            campaign.currentFunding < campaign.fundingGoal,
            "Campaign goal has been reached"
        );

        uint256 donationAmount = donations[_id][msg.sender];
        require(donationAmount > 0, "No funds to refund");

        donations[_id][msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: donationAmount}("");
        require(success, "Failed to refund funds");

        emit FundRefunded(_id, msg.sender, donationAmount);
    }
}
