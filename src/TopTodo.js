import React from "react";

import Todo from "./Todo";

/** Shows the top todo.
 *
 * Props:
 * - todos = [{id, title, description, priority}... ]
 *
 * TodoApp -> TopTodo
 */

function TopTodo({ todos }) {
  // lowest-priority # is the highest priority
  let todo = todos.reduce(
    (acc, cur) => cur.priority < acc.priority ? cur : acc, todos[0]);

  return (
    <Todo
      todo={todo}
    />
  );
}

export default TopTodo;