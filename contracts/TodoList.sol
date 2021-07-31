pragma solidity ^0.5.0;

contract TodoList {
    uint public todoCount = 0;

    constructor() public {
        addTask('Welcome to blockchain task');
    }

    struct Task {
        uint id;
        string description;
        bool done;
    }

    event TaskAdded(
        uint id,
        string description,
        bool done
    );

    mapping (uint => Task) public tasks;

    function addTask(string memory _description) public {
        uint id = ++todoCount;
        tasks[todoCount] = Task(todoCount, _description, false);
        emit TaskAdded(todoCount, _description, false);
    }
}