async function fetchTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error("Error fetching Todos:", error.message);
    throw error;
  }
}

(async () => {
  try {
    const todos = await fetchTodos();
    console.log(todos);
  } catch (error) {
    console.log(error);
  }
})();
