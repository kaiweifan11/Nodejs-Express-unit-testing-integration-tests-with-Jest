const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) =>{
    try{
        const createdTodo = await TodoModel.create(req.body);
        res.status(201).json(createdTodo);
    } catch (err) {
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try{
        // mongodb method to get data from db
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) =>{
    try{
        // mongodb method to get data from db
        const todoModel = await TodoModel.findById(req.params.todoId);
        if(todoModel) res.status(200).json(todoModel);
        else return res.status(404).send();
    } catch (err) {
        next(err);
    }
}

exports.updateTodo = async (req, res, next) => {
    try{
        // mongodb method to get data from db
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true,
            useFindAndModify: false,
        })
        if(updatedTodo) res.status(200).json(updatedTodo);
        else return res.status(404).send();
    } catch (err) {
        next(err);
    }
}

exports.deleteTodo = async (req, res, next) =>{
    try{
        // mongodb method to get data from db
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
    
        if(deletedTodo) res.status(200).json(deletedTodo);
        else return res.status(404).send();
    } catch (err) {
        next(err);
    }
}