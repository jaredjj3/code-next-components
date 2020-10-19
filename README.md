# Code Next - Components

[Fork on StackBlitz ⚡️](https://stackblitz.com/fork/code-next-components)

This is a lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- learn what props are
- learn how to make components talk to each other

## LECTURE: What are React props?

A simple analogy with React components and props:

function -> component

parameter -> prop

```jsx
// function
const upcase = (str) => str.toUpperCase();

// component
const Upcase = (props) => {
  const upcased = props.str.toUpperCase();
  return <span>{upcased}</span>;
};
```

Props are the mechanism by which components talk to each other. Passing non-function props enable communication from a **parent to a child**. 

```jsx
// The SeriousMessage component "talks to" the Upcase component
// through the `str` prop. 
const SeriousMessage = (props) => {
  return (
    <div>
      <h2>IMPORTANT MESSAGE:</h2>
      <p><Upcase str={str} /></p>
    </div>
  );
};
```

Every React function component has a `props` argument that contains all the props passed from the calling context.

Passing function props enable communication from a **child to a parent**.

This is particularly useful when sibling components need to share state. 

```jsx
const LastWordRemover = (props) => {
  const onClick = () => {
    const words = props.str.split(' ');
    words.pop();
    props.onLastWordRemove(words);
  };

  return <button>remove last word</button>;
};

const StrStats = () => {
  const [str, setStr] = useState('foo bar baz bam');
  
  const onLastWordRemove = (nextStr) => {
    setStr(nextStr);
  };

  // Upcased, WordCount, and LastWordRemover are siblings.
  // They all need access to the `str` prop, but
  // LastWordRemover wants to be able to modify it. We use
  // an event handler to allow LastWordRemover to talk to
  // its parent, StrStats. It's StrStats's responsibility
  // to mutate the state according to LastWordRemover's message.
  return (
    <div>
      <Upcased str={str} />
      <WordCount str={str} />
      <LastWordRemover
        str={str}
        onLastWordRemove={onLastWordRemove}
      />
    </div>
  );
};
```

Just remember the following analogy and you will be fine:

function -> component

parameter -> prop

## YOUR TURN: TODO App

Let's make a simple TODO app that will combine the ideas we just learned. It will be composed of:

- a TODO input
- a TODO count
- a TODO list

First, make a TODO input and TODO list and render it in the `Todo` component. Here's a hint to help you get started:

_TodoInput.js_

```jsx
import React from 'react';

export const TodoInput = () => {
  return <div>TodoInput</div>;
};
```

_TodoCount.js_

```jsx
import React from 'react';

export const TodoCount = () => {
  return <div>TodoCount</div>;
};
```

_TodoList.js_

```jsx
import React from 'react';

export const TodoList = () => {
  return <div>TodoList</div>;
};
```

_Todo.js_

```jsx
import React from 'react';
import { TodoInput } from './TodoInput';
import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';

export const Todo = () => {
  return (
    <div>
      <TodoInput />
      <TodoCount />
      <TodoList />
    </div>
  );
};
```

The `Todo` component should have a `todos` state, which will be an array of strings. Create the state and pass it to the components that need it. Think about what components will need it.

Solution:

_Todo.js_

```jsx
export const Todo = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoInput />
      <TodoCount todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
```

Now think about which component will update the `todos` state and where the `todos` lives. Create something that will allow communication between the components involved.

Solution:

```jsx
export const Todo = () => {
  const [todos, setTodos] = useState(['foo todo']);

  const onTodoInputSubmit = (todo) => {
    const nextTodos = [...todos];
    nextTodos.push(todo);
    setTodos(nextTodos);
  };

  return (
    <div>
      <TodoInput onSubmit={onTodoInputSubmit} />
      <TodoCount todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
```

Let's flesh out the `TodoCount` component, since it's the easiest. Display the count of the `todos`.

Solution:

```jsx
export const TodoCount = (props) => {
  return <div>You have {props.todos.length} todo(s) remaining.</div>
};
```

Next, let's do the `TodoList` component, so we can explicitly see what's in the `todos` array. You will need to specify a `keys` prop for each `<li>`. You can read more about the `key` prop [here](https://reactjs.org/docs/lists-and-keys.html).

>NOTE: reactjs.org recommends not using the array index as a `key` prop. In real life, you should have a unique identifier tied to each todo that you should use instead.

Solution:

```jsx
export const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map((todo, ndx) => <li key={`todo-list-item-${ndx}`}>{todo}</li>)}
    </ul>
  );
}; 
```

Lastly, let's do the `TodoInput` component. First, let's keep track of what's being typed in the input. How do we do that? State!

We can sync the state we created with the value in the input using the `value` prop on the `<input>` tag.

Solution:

```jsx
export const TodoInput = (props) => {
  const [todo, setTodo] = useState('');

  return (
    <div>
      <input value={todo} />
      <button>submit</button>
    </div>
  );
};
```

Cool. If you try typing into the `<input>`, you'll notice that nothing happens. Why is that?

Solution: React is ensuring that the input's `value` matches what's in it.

So what we need to do is update the state everytime a change is issued. Leverage the `onChange` prop on the `<input>`.

Solution:

```jsx
export const TodoInput = (props) => {
  const [todo, setTodo] = useState('');

  const onChange = (e) => {
    setTodo(e.target.value);
  }; 

  return (
    <div>
      <input value={todo} onChange={onChange} />
      <button>submit</button>
    </div>
  );
};
```

Great! Now when you type in the input, React will ensure that the `value` matches `todo`.

Clicking the submit button does nothing. Before you code, think about what it should do.

Solution: It should call the `onSubmit` handler from the `Todo` component AND clear the `todo`, in that order.

```jsx
export const TodoInput = (props) => {
  const [todo, setTodo] = useState('');

  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onSubmitClick = () => {
    props.onSubmit(todo); // This is how we defined it in the parent!
    setTodo(''); 
  };

  return (
    <div>
      <input value={todo} onChange={onInputChange} />
      <button onClick={onSubmitClick}>submit</button>
    </div>
  );
};
```

aaaaaand viola! We have a working todo app. Now that the business logic is done, we can style it as we like.

BONUS: Add a mechanism to delete todos when they are clicked.

Solution: In the `TodoList` component, we should install a click handler on each `<li>` that when clicked, will remove the todo. Since the `Todo` component controls the `todos` state, let's update this first.

```jsx
export const Todo = () => {
  const [todos, setTodos] = useState(['foo todo']);

  const onTodoInputSubmit = (todo) => {
    const nextTodos = [...todos];
    nextTodos.push(todo);
    setTodos(nextTodos);
  };

  const onTodoClear = (ndx) => {
    const nextTodos = [...todos];
    nextTodos.splice(ndx, 1);
    setTodos(nextTodos);
  };

  return (
    <div>
      <TodoInput onSubmit={onTodoInputSubmit} />
      <TodoCount todos={todos} />
      <TodoList todos={todos} onClear={onTodoClear} />
    </div>
  );
};
```

Now, we need to consume the `onClear` prop in the `TodoList` component. Here's the trickiest part. We need to pass the _index_ of the `ith` list item that was clicked. Here's where higher order functions (functions that return functions) come handy.

Solution:

```jsx
export const TodoList = (props) => {
  const onListItemClick = (ndx) => () => {
    props.onClear(ndx);
  };

  return (
    <ul>
      {props.todos.map((todo, ndx) => (
        <li
          key={`todo-list-item-${ndx}`}
          onClick={onListItemClick(ndx)}
        >
          {todo}
        </li>
      ))}
    </ul>
  );
}; 
```

Now, when a list item is clicked, it will talk to the `Todo` component using the `onClear` prop. The `Todo` component will update its `todos` array and React will take care of changing everything that is "listening" to the `todos` array.

Good job!

## Reflection

- How do parent components talk to child components?
- How do child components talk to parent components?
- What needs to happen if sibling components need to share state - where should the state live?

## YOUR TURN: Cart Page

[Live Example](https://github.com/arnab-datta/counter-app)

[Source code](https://github.com/arnab-datta/counter-app)

Ok, so we've made tons of counter examples because they are easy to talk about in a short class. Is there a practical use? Assuming you read this section's title, there is!

If you're planning to make a business that sells different things, your customers will probably want a running tally of how many items they've checked out so far.

In this project, you will make a cart page similar to the one linked above. This is designed to be an open ended question, but I encourage you to look at the source code to get ideas.

Divide the problem into smaller subproblems, then solve each subproblem like we did in the TODO list example.

Hints:

What components do you need? This is an art - there is no wrong or right answer, but some answers may work better than others in different contexts.

What should each component do?

How should the components talk to each other?

For each component, what state does it need to track?

Where should the state live? Does another component need access to the same state? Should the state be lifted to a parent component?
