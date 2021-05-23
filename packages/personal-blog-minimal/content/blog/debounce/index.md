---
title: Debounce - handle browser resize like a pro
date: '2021-05-23'
description: How to properly handle window resize events in React.
tags:
  [
    'react',
    'typescript',
    'debounce',
    'frontend',
    'browser',
    'engineering',
    'web',
    'useDebouncedCallback',
    'useDebounce',
    'UI',
    'useEffect',
    'resize',
  ]
cover: './debounce.jpeg'
---

I was recently tasked with fixing some UI bugs at work. Our navbar wasn't refreshing with more items when the browser was resized. I thought to myself "This should be a breeze to fix".

### Exploring "the obvious but wrong" solution

I thought it was obvious which methodology to use – this led me to "the obvious but wrong" solution of using the `resize` event.

My first step was to add an event listener for the `resize` event, which fires every time the document view is resized. This event listener triggered an event handling callback that I defined. I then used the `useEffect` hook to create and remove event listeners for the component I was working on. The `resize` event listener is added on page mount, and cleaned up on unmount with a return statement of the `useEffect` hook. So far so good. Next, I wrapped the event handler in a `useCallback` to ensure that `resizeHandler` does not change between re-renders (i.e. it gets memoized). Thus I was able to safely use it as a dependency of the `useEffect` hook.

The code matching the above specification is shown below:

```js
import { useCallback, useEffect } from 'react';

const resizeHandler = useCallback(() => {
  // does callback stuff
}, []);

useEffect(() => {
  window.addEventListener('resize', resizeHandler);
  return () => {
    window.removeEventListener('resize', resizeHandler);
  };
}, [resizeHandler]);
```

The above code did work, but at a cost of slowing down the UI. Not a great start... At this point, I wasn't sure what went wrong.

### So... what exactly went wrong?

To understand the problem, I modified the above code to measure the number of times `resizeHandler` is called. I declared a state variable called `counter` and modified `resizeHandler` to increment the value of `counter` by 1 every time the callback is called (see the code snippet below).

```js
import { useState } from 'react';

const [counter, setCounter] = useState(0);

const resizeHandler = useCallback(() => {
  // do callback stuff, AND then...
  setCounter((c) => c + 1);
}, []);

//

return <>{counter}</>;
```

Resizing the browser from full to half width on my 16inch monitor triggered `resizeHandler` **30** times. Whoa! If more of such `resizeHandlers` were included in the code, it would force too many re-renders, making the page unbearably slow... This is certainly not a production worthy fix.

### Exploring "the non-obvious but right" solution

My problem has now become much more specific: how can I handle the `resize` event, without overwhelming the app with too many re-renders? The answer is: **debouncing** Debouncing limits the rate at which the function fires. My favourite tool for the job is a library called `use-debounce` ([link](https://www.npmjs.com/package/use-debounce)). Creating a debounced callback was as easy as replacing `useCallback` with `useDebouncedCallback` imported from the library. One additional parameter accepted by `useDebouncedCallback` is the time delay in milliseconds. After a few minutes of tinkering, I realised that 200ms should do the trick.

```js
import { useDebouncedCallback } from 'use-debounce/lib';

const handleResize = useDebouncedCallback(
  () => setSlowCounter((c) => c + 1),
  200
);
```

The effects of this change were significant - the new callback fired only once where the old one fired 30 times (note that your numbers may vary, depending on how quickly or slowly you resize the browser).

![Comparison of callback functions](/figure1.png 'Comparison of callback functions') <center><span style="color: #a6a6a6; font-size: 14px; margin-bottom: 0px">Side-by-side comparison of callback performance</span></center>

"The non-obvious but right" solution is what ultimately got pushed into production!

### Main learning points

- Debouncing is a great way to get rid of unnecesary re-renders;
- You should ALWAYS think about methodology before you type your first line of code;
- Quantifying performance is the most effective tool in every software engineer's toolkit.
