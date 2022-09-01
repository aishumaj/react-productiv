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
  let {id, title, description, priority} = todos.reduce(
    (acc, cur) => cur.priority < acc.priority ? cur : acc, todos[0]);

  return (
  <Todo id={id} title={title} description={description} priority={priority}/>
  )}

export default TopTodo;