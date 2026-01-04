import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getTodosByUser, addTodo, deleteTodo, updateTodoTitle, toggleTodoCompleted } from "../API/todosApi";
import "../css/todos.css";
import MyTodo from "../components/myTodos/MyTodo";
import AddTodo from "../components/myTodos/AddTodo";
import Select from "../components/myTodos/Select";
import Search from "../components/myTodos/Search";


function Todos() {
    const { currentUser } = useContext(MyContext);
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]); // מה שמוצג על המסך
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        if (!currentUser) return;
        getTodosByUser(currentUser.id).then(data => {
            setTodos(data);
            setFilteredTodos(data);
        });
    }, [currentUser]);

    const handleToggleCompleted = async (todo) => {
        const updated = await toggleTodoCompleted(todo.id, !todo.completed);

        const newTodos = todos.map(t =>
            t.id === todo.id ? updated : t
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


    const handleUpdateTitle = async (todo) => {
        const newText = prompt("Enter new title:", todo.title);
        if (!newText) return;

        const updated = await updateTodoTitle(todo.id, newText);

        const newTodos = todos.map(t =>
            t.id === todo.id ? updated : t
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
                <Search todos={todos} onFilter={setFilteredTodos} />

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
