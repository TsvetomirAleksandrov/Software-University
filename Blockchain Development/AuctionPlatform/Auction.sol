// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract AuctionPlatform {
    uint256 public auctionCount;

    struct Auction {
        uint256 start;
        uint256 duration;
        uint256 highestBid;
        address highestBidder;
        bool finalized;
        string itemName;
        string itemDescription;
        uint256 startingPrice;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256) public availableToWithdrawal;

    event NewAuction(
        uint256 indexed id,
        uint256 start,
        uint256 duration,
        string itemName,
        string itemDescription,
        uint256 startingPrice
    );
    event BidPlaced(uint256 indexed id, address indexed bidder, uint256 amount);
    event AuctionFinalized(
        uint256 indexed id,
        address indexed winner,
        uint256 amount
    );
    event FundsWithdrawn(address indexed user, uint256 amount);

    function createAuction(
        uint256 start,
        uint256 duration,
        string memory itemName,
        string memory itemDescription,
        uint256 startingPrice
    ) public {
        require(
            start > block.timestamp,
            "Start time must be greater than current time!"
        );
        require(duration > 0, "Duration must be greater than 0!");
        auctionCount++;
        auctions[auctionCount] = Auction(
            start,
            duration,
            startingPrice,
            address(0),
            false,
            itemName,
            itemDescription,
            startingPrice
        );
        emit NewAuction(
            auctionCount,
            start,
            duration,
            itemName,
            itemDescription,
            startingPrice
        );
    }

    function placeBid(uint256 auctionId)
        public
        payable
        onlyActiveAuction(auctionId)
    {
        Auction storage auction = auctions[auctionId];

        require(
            msg.value > auction.highestBid,
            "Bid amount must be higher than current highest bid"
        );

        if (auction.highestBidder != address(0)) {
            availableToWithdrawal[auction.highestBidder] += auction.highestBid;
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 auctionId)
        public
        onlyActiveAuction(auctionId)
    {
        Auction storage auction = auctions[auctionId];

        if (auction.highestBidder != address(0)) {
            uint256 amountToTransfer = auction.highestBid;
            if (amountToTransfer > 0) {
                payable(address(auction.highestBidder)).transfer(
                    amountToTransfer
                );
            }
            emit AuctionFinalized(
                auctionId,
                auction.highestBidder,
                amountToTransfer
            );
        }
        auction.finalized = true;
    }

    function withdraw() public {
        uint256 amount = availableToWithdrawal[msg.sender];
        require(amount > 0, "No funds available to widthraw!");
        availableToWithdrawal[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    modifier onlyActiveAuction(uint256 auctionId) {
        require(auctions[auctionId].start > 0, "Auction does not exist");
        require(!auctions[auctionId].finalized, "Auction is already finalized");
        require(
            block.timestamp >= auctions[auctionId].start,
            "Auction is not started yet"
        );
        require(
            block.timestamp <=
                auctions[auctionId].start + auctions[auctionId].duration,
            "Auction already ended"
        );
        _;
    }
}
