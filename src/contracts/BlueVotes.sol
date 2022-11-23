//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlueVotes {
    struct PollStruct {
        uint id;
        string image;
        string title;
        string description;
        uint votes;
        uint contestants;
        bool deleted;
        address director;
        uint startsAt;
        uint endsAt;
        uint timestamp;
    }

    struct VoterStruct {
        uint id;
        string image;
        string fullname;
        address voter;
        uint votes;
        address[] voters;
    }

    uint totalPolls;
    uint totalUsers;
    PollStruct[] polls;

    mapping(address => VoterStruct) public users;
    mapping(uint =>  mapping(address => bool)) voted;
    mapping(uint =>  mapping(address => bool)) contested;
    mapping(uint =>  VoterStruct[]) contestantsIn;
    mapping(uint =>  bool) pollExist;

    event Voted (
        string fullname,
        address indexed voter,
        uint timestamp
    );

    modifier userOnly() {
        require(users[msg.sender].voter == msg.sender, "You've gotta register first");
        _;
    }

    function createPoll(
        string memory image,
        string memory title,
        string memory description,
        uint startsAt,
        uint endsAt
    ) public userOnly {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(startsAt > 0 && endsAt > startsAt, "End date must be greater than start date");

        PollStruct memory poll;
        poll.id = totalPolls++;
        poll.title = title;
        poll.description = description;
        poll.image = image;
        poll.startsAt = startsAt;
        poll.endsAt = endsAt;
        poll.director = msg.sender;
        poll.timestamp = block.timestamp;

        polls.push(poll);
        pollExist[poll.id] = true;
    }

    function updatePoll(
        uint id,
        string memory image,
        string memory title,
        string memory description,
        uint startsAt,
        uint endsAt
    ) public userOnly {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(!polls[id].deleted, "Polling already started");
        require(endsAt > startsAt, "End date must be greater than start date");

        polls[id].title = title;
        polls[id].description = description;
        polls[id].startsAt = startsAt;
        polls[id].endsAt = endsAt;
        polls[id].image = image;
    }

    function deletePoll(uint id) public userOnly {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        polls[id].deleted = true;
    }

    function getPoll(uint id) public view returns (PollStruct memory) {
        return polls[id];
    }

    function getPolls() public view returns (PollStruct[] memory) {
        return polls;
    }

    function register(
        string memory image,
        string memory fullname
    ) public {
        VoterStruct memory user;
        user.id = totalUsers++;
        user.image = image;
        user.fullname = fullname;
        user.voter = msg.sender;
        users[msg.sender] = user;
    }

    function contest(uint id) public userOnly {
        require(pollExist[id], "Poll not found");
        require(!contested[id][msg.sender], "Already contested");

        VoterStruct memory user = users[msg.sender];
        contestantsIn[id].push(user);
        contested[id][msg.sender] = true;
        polls[id].contestants++;
    }

    function listContestants(uint id) public view returns (VoterStruct[] memory) {
        require(pollExist[id], "Poll not found");
        return contestantsIn[id];
    }

    function vote(uint id, uint cid) public userOnly {
        require(pollExist[id], "Poll not found");
        require(!voted[id][msg.sender], "Already voted");
        require(!polls[id].deleted, "Polling already started");
        require(polls[id].endsAt > polls[id].startsAt, "End date must be greater than start date");

        polls[id].votes++;
        contestantsIn[id][cid].votes++;
        contestantsIn[id][cid].voters.push(msg.sender);
        voted[id][msg.sender] = true;

        emit Voted (
            users[msg.sender].fullname,
            msg.sender,
            block.timestamp
        );
    }
}