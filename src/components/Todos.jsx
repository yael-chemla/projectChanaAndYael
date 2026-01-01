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
        setFilteredTodos(todos.map(t => t.id === todo.id ? updated : t));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setFilteredTodos(todos.filter(t => t.id !== id));
    };

    const handleUpdateTitle = async (todo) => {
        const newText = prompt("Enter new title:", todo.title);
        if (newText) {
            const updated = await updateTodoTitle(todo.id, newText);
            setFilteredTodos(todos.map(t => t.id === todo.id ? updated : t));
        }
    };

    const handleAddTodo = async () => {
        if (!newTitle) return;
        const newTodo = {
            title: newTitle,
            userId: currentUser.id,
            completed: false
        };
        const added = await addTodo(newTodo);
        setFilteredTodos([...todos, added]);
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

            {/* תוכן שמאל */}
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
