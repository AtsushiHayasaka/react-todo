import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (e) => setTodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    let newTodos = [...incompleteTodos];
    newTodos = newTodos.filter((todo) => {
      return todo !== newTodos[index];
    });
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    let newIncompleteTodos = [...incompleteTodos];
    const addTarget = newIncompleteTodos[index];
    newIncompleteTodos = newIncompleteTodos.filter((todo) => {
      return todo !== addTarget;
    });

    const newCompleteTodos = [...completeTodos, addTarget];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    let newCompleteTodos = [...completeTodos];
    const backTarget = newCompleteTodos[index];
    newCompleteTodos = newCompleteTodos.filter((todo) => {
      return todo !== backTarget;
    });

    const newIncompleteTodos = [...incompleteTodos, backTarget];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>追加できるtodoは5個までだよ</p>
      )}

      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

/**
 * アイテムが５個以上になったらメッセージ出現＆inputと追加buttonにdisabledを
 *
 */
