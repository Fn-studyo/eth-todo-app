const { assert } = require("chai");

const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    if('deploys successfully', async() => {
        const address = await this.todoList.address;
        assert.equal(address, '0x0')
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async () => {
        const todoCount = await this.todoList.todoCount()
        const task = await this.todoList.tasks(todoCount)
        assert.equal(task.id.toNumber(), todoCount.toNumber())
        assert.equal(task.description, 'Welcome to blockchain task')
        assert.equal(task.done, false)
        assert.equal(todoCount.toNumber(), 1)
      })

    it('creates tasks', async () => {
        const result = await this.todoList.addTask('A new task')
        const todoCount = await this.todoList.todoCount()
        assert.equal(todoCount, 2)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.description, 'A new task')
        assert.equal(event.done, false)
    })
})