import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context";
import { getTodosByUser, addTodo, deleteTodo, updateTodoTitle, toggleTodoCompleted } from "../../API/todosApi";
import "../../css/todos.css";
import MyTodo from "./MyTodo";
import SearchTodos from "./SearchTodos";
import GeneralAdd from "../GeneralAdd"
import SelectTodo from "./SelectTodo";

function Todos() {
    const { currentUser } = useContext(MyContext);
    const [todos, setTodos] = useState([]);//מערך של כל המשימות
    const [filteredTodos, setFilteredTodos] = useState([]);//המערך של המשימות שמוצג על המסך ( בגלל הסינונים..)
    const [newTitle, setNewTitle] = useState("");//הכותרת של הוספת משימה

    useEffect(() => {
        if (!currentUser) return;
        getTodosByUser(currentUser.id).then(data => {
            setTodos(data);
            setFilteredTodos(data);
        });
    }, [currentUser]);
    //פונקציה של עדכון מצב ביצוע
    const handleToggleCompleted = async (id) => {
        const todo = todos.find(t => t.id === id);
        //עדכון ב DB
        const updated = await toggleTodoCompleted(id, !todo.completed);
        //עדכון המערך המשימות פה
        const newTodos = todos.map(t =>
            t.id === id ? updated : t
        );

        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };
    //מחיקת משימה
    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);

        const newTodos = todos.filter(t => t.id !== id);
        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };
    //עדכון כותרת
    const handleUpdateTitle = async (id, newTitle) => {
        if (!newTitle) return;

        const updated = await updateTodoTitle(id, newTitle);

        const newTodos = todos.map(t =>
            t.id === id ? updated : t
        );

        setTodos(newTodos);
        setFilteredTodos(newTodos);
    };
    //הוספת משימה
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
                <GeneralAdd
                    value={newTitle}
                    setValue={setNewTitle}
                    onAdd={handleAddTodo}
                    placeholder="New todo title"
                    buttonText="Add Todo"
                    isTextArea={false}
                />
                <SelectTodo todos={todos} onFilter={setFilteredTodos} />
                <SearchTodos todos={todos} onFilter={setFilteredTodos} />
                <br></br>
            </div>

            <main className="todos-content">
                <div className="todos-grid">
                    {filteredTodos.map(todo => (
                        <MyTodo
                            key={todo.id}
                            todo={todo}
                            handleToggleCompleted={handleToggleCompleted}
                            handleUpdateTitle={handleUpdateTitle}
                            handleDelete={handleDeleteTodo}
                        />
                    ))}
                </div>
            </main>

        </div>
    );

}

export default Todos;
