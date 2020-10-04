# Code Next - Components

[Fork on StackBlitz ⚡️](https://stackblitz.com/fork/code-next-components)

This is a lesson for the [Code Next](https://codenext.withgoogle.com/) React club.

In this lesson, engineers will

- learn what props are
- learn how to make components talk to each other
- know when to break up a bigger component into a smaller one

## What are React props?

Here's the simplest way that I can express React props:

function -> component

parameter -> 

or more concretely:

```jsx
// function
const upcase = (str) => str.toUpperCase();

// component
const Upcase = (props) => {
  const upcased = props.str.toUpperCase();
  return <span>{upcased}</span>;
}
```
