//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlueVotes {
    enum PollStatus {
        OPEN,
        STARTED,
        ENDED,
        DELETED
    }

    struct PollStruct {
        uint id;
        string image;
        string title;
        string description;
        uint votes;
        uint contestants;
        PollStatus status;
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
    }

    uint totalPolls;
    uint totalVoters;
    address admin;
    mapping(uint => PollStruct) polls;
    mapping(uint => VoterStruct[]) contestantsIn;
    mapping(uint => VoterStruct[]) votesOf;
    mapping(address => VoterStruct) users;
    mapping(uint =>  mapping(address => bool)) voted;
    mapping(uint =>  mapping(address => bool)) contested;
    mapping(uint =>  bool) pollExist;

    constructor() {
        admin = msg.sender;
    }

    event Voted (
        string fullname,
        address indexed voter,
        uint timestamp
    );

    function createPoll(
        string memory image,
        string memory title,
        string memory description,
        uint startsAt,
        uint endsAt
    ) public {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(startsAt > block.timestamp, "Start date cannot be now");
        require(endsAt > startsAt, "End date must be greater than start date");

        PollStruct memory poll;
        poll.id = totalPolls++;
        poll.title = title;
        poll.description = description;
        poll.image = image;
        poll.startsAt = startsAt;
        poll.endsAt = endsAt;
        poll.director = msg.sender;

        polls[poll.id] = poll;
        pollExist[poll.id] = true;
    }

    function updatePoll(
        uint id,
        string memory image,
        string memory title,
        string memory description,
        uint startsAt,
        uint endsAt
    ) public {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(image).length > 0, "Image URL cannot be empty");
        require(startsAt < block.timestamp, "Start date cannot be now");
        require(polls[id].status <= PollStatus.OPEN, "Polling already started");
        require(endsAt > startsAt, "End date must be greater than start date");

        polls[id].title = title;
        polls[id].description = description;
        polls[id].startsAt = startsAt;
        polls[id].endsAt = endsAt;
        polls[id].image = image;
    }

    function deletePoll(uint id) public {
        require(pollExist[id], "Poll not found");
        require(polls[id].director == msg.sender, "Unauthorized entity");
        polls[id].status = PollStatus.DELETED;
    }

    function getPoll(uint id) public view returns (PollStruct memory) {
        return polls[id];
    }

    function getPolls() public view returns (PollStruct[] memory Polls) {
        Polls = new PollStruct[](totalPolls);
        for(uint i = 0; i < totalPolls; i++) {
             if(polls[i].status != PollStatus.DELETED){
                 Polls[i] = polls[i];
             }
        }
    }

    function register(
        string memory image,
        string memory fullname
    ) public {
        VoterStruct memory user;
        user.id = totalVoters++;
        user.image = image;
        user.fullname = fullname;
        user.voter = msg.sender;
        users[msg.sender] = user;
    }

    function contest(uint id) public {
        require(pollExist[id], "Poll not found");
        require(!contested[id][msg.sender], "Already contested");

        polls[id].contestants++;
        contestantsIn[id].push(users[msg.sender]);
        contested[id][msg.sender] = true;
    }

    function listContestants(uint id) public view returns (VoterStruct[] memory Contestants) {
        require(pollExist[id], "Poll not found");

        Contestants = new VoterStruct[](contestantsIn[id].length);
        for(uint i = 0; i < contestantsIn[id].length; i++) {
            Contestants[i] = contestantsIn[id][i];
        }
    }

    function vote(uint id) public {
        require(pollExist[id], "Poll not found");
        require(!voted[id][msg.sender], "Already voted");
        require(polls[id].startsAt < block.timestamp, "Start date cannot be now");
        require(polls[id].status <= PollStatus.OPEN, "Polling already started");
        require(polls[id].endsAt > polls[id].startsAt, "End date must be greater than start date");

        VoterStruct memory voter = users[msg.sender];
        voter.votes++;
        polls[id].votes++;
        votesOf[id].push(voter);
        voted[id][msg.sender] = true;
    }
}