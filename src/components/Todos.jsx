import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getTodosByUser, addTodo, deleteTodo, updateTodoTitle, toggleTodoCompleted } from "../API/todosApi";
import "../css/todos.css";
import MyTodo from "./myTodos/MyTodo";
import AddTodo from "./myTodos/AddTodo";
import Select from "./myTodos/Select";
import GeneralSearch from "./GeneralSearch";


function Todos() {
    const { currentUser } = useContext(MyContext);
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        if (!currentUser) return;
        getTodosByUser(currentUser.id).then(data => {
            setTodos(data);
            setFilteredTodos(data);
        });
    }, [currentUser]);

    // const handleToggleCompleted = async (todo) => {
    //     const updated = await toggleTodoCompleted(todo.id, !todo.completed);

    //     const newTodos = todos.map(t =>
    //         t.id === todo.id ? updated : t
    //     );

    //     setTodos(newTodos);
    //     setFilteredTodos(newTodos);
    // };
    const handleToggleCompleted = async (id) => {
        const todo = todos.find(t => t.id === id);

        const updated = await toggleTodoCompleted(id, !todo.completed);

        const newTodos = todos.map(t =>
            t.id === id ? updated : t
        );

        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };



    const handleDelete = async (id) => {
        await deleteTodo(id);

        const newTodos = todos.filter(t => t.id !== id);
        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };


    // const handleUpdateTitle = async (todo) => {
    //     const newText = prompt("Enter new title:", todo.title);
    //     if (!newText) return;

    //     const updated = await updateTodoTitle(todo.id, newText);

    //     const newTodos = todos.map(t =>
    //         t.id === todo.id ? updated : t
    //     );

    //     setTodos(newTodos);
    //     setFilteredTodos(newTodos);
    // };

    const handleUpdateTitle = async (id, newTitle) => {
        if (!newTitle) return;

        const updated = await updateTodoTitle(id, newTitle);

        const newTodos = todos.map(t =>
            t.id === id ? updated : t
        );

        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };


    const handleAddTodo = async () => {
        if (!newTitle) return;

        const newTodo = {
            title: newTitle,
            userId: currentUser.id,
            completed: false
        };

        const added = await addTodo(newTodo);
        const newTodos = [...todos, added];

        setTodos(newTodos);
        setFilteredTodos(newTodos);
        setNewTitle("");
    };
    const showCompleted = () => {
        const filtered = todos.filter(t => t.completed === true);
        setFilteredTodos(filtered);
    };

    const showNotCompleted = () => {
        const filtered = todos.filter(t => t.completed === false);
        setFilteredTodos(filtered);
    };

    return (
        <div className="todos-page">

            <div className="todos-sidebar">
                <AddTodo
                    handleAddTodo={handleAddTodo}
                    setNewTitle={setNewTitle}
                    newTitle={newTitle}
                />
                <br></br>

                <Select todos={todos} onFilter={setFilteredTodos} />
                <br></br>
                <GeneralSearch items={todos} onFilter={setFilteredTodos} />
                <div>
                    <button onClick={showCompleted}>completed</button>
                    <button onClick={showNotCompleted} style={{ marginLeft: "5px" }}>
                        not completed
                    </button>
                </div>
            </div>

            <main className="todos-content">
                <div className="todos-grid">
                    {filteredTodos.map(todo => (
                        <MyTodo
                            key={todo.id}
                            todo={todo}
                            handleToggleCompleted={handleToggleCompleted}
                            handleUpdateTitle={handleUpdateTitle}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </main>

        </div>
    );

}

export default Todos;
