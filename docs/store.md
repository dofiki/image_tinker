# Store

The editor store is built using Zustand for state management of the whole application. It uses the Command pattern for implementing undo/redo, which allows us to call methods like `addElement`, `undo`, `handleCopy` etc. from different places in the program.

It has the following global state:

```typescript
canvasConfig: null,      // canvas properties
past: [],                // used for undo and redo
future: [],              // used for undo and redo
elements: [],            // contains all the elements
selectedElementId: null, // selected element's id (in canvas)
rulerStatus: true,       // by default ruler is rendered
gridStatus: false,       // by default grid is not rendered
```

The store consists of operations like `addElement`, `removeElement`, and `updateElement` that capture all possible operations in the application. There are also `handleCopy` and `handlePaste` which under the hood use `addElement`. Operations like `undo` and `redo` operate upon the `past` and `future` stacks.

---

## `addElement`

`addElement` is our client, it creates the commands, passes them to `dispatch`,
and stores the returned state using `set`.

- **Receiver** : `elements` is the receiver. It is the actual data being operated 
  on. Every command ultimately transforms it.
- **Command** : the inline object with `execute` and `reverse`. It closes over (remembers a variable from the scope it was created in) `newElement` so it knows what to add and what to remove on reverse.
- **Invoker** : `dispatch` is the invoker. It triggers the command without knowing 
  what the command does, it just calls `execute` and manages the history stack.
```typescript
addElement: (newElement) => {
  const { elements, past } = get();         // Receiver

  const commands: Commands = {              // Command
    execute: (els) => [...els, newElement],
    reverse: (els) => els.filter((el) => el.id !== newElement.id),
  };

  set(dispatch(commands, elements, past));  // Invoker
},
```

---

## `updateElement`

```typescript
updateElement: (id, updates) => {
  const { elements, past } = get();

  const original = elements.find((el) => el.id === id);
  if (!original) return;

  const commands: Commands = {
    execute: (els) =>
      els.map((el) =>
        el.id === id ? ({ ...el, ...updates } as Element) : el,
      ),
    reverse: (els) => els.map((el) => (el.id === id ? original : el)),
  };

  set(dispatch(commands, elements, past));
},
```

---

## `removeElement`

```typescript
removeElement: (id) => {
  const { elements, past } = get();

  const target = elements.find((el) => el.id === id);
  const targetIndex = elements.findIndex((el) => el.id === id);
  if (!target) return;

  const command: Commands = {
    execute: (els) => els.filter((el) => el.id !== id),
    reverse: (els) => {
      const result = [...els];
      result.splice(targetIndex, 0, target);
      return result;
    },
  };

  set(dispatch(command, elements, past));
},
```

---

## `dispatch`

All of the above operations work on the `elements` state. Instead of mutating it directly, a set of commands associated with each operation are passed to `dispatch`, which executes them and returns the next state. The function lives outside the store.

```typescript
function dispatch(commands: Commands, elements: Element[], past: Commands[]) {
  const MAX_HISTORY = 30;

  return {
    elements: commands.execute(elements),
    past: [...past, commands].slice(-MAX_HISTORY),
    future: [],
  };
}
```

---

## `undo`

The neat thing about this approach is that `undo` can be triggered from an undo button or mapped to `Ctrl+Z` and it works seamlessly. To understand undo/redo you need to know there are three states: past, present, and future.

```typescript
undo: () => {
  const { past, elements, future } = get();
  if (past.length === 0) return;

  const command = past[past.length - 1];

  set({
    past: past.slice(0, -1),
    elements: command.reverse(elements),
    future: [command, ...future],
  });
},
```

What happens when the user presses `Ctrl+Z` or clicks the undo button:

1. We access `past`, `elements` (the present state of canvas elements), and `future`.
2. If `past` is empty we return early.
3. We extract the most recently performed command from the end of `past`.
4. We call `set` to update the store:
   - Remove the extracted command from `past`.
   - Call `command.reverse(elements)` to reverse the operation ( for example, if `addElement` was performed, this removes that element. )
   - Push the extracted command to the front of `future` so it can be replayed if the user redoes.

---

## `redo`

```typescript
redo: () => {
  const { past, elements, future } = get();
  if (future.length === 0) return;

  const command = future[0];

  set({
    past: [...past, command],
    elements: command.execute(elements),
    future: future.slice(1),
  });
},
```

What happens when the user clicks the redo button:

1. We access `past`, `elements`, and `future`.
2. If `future` is empty we return early.
3. We extract the first item from `future` that is where the command was saved when undo was performed.
4. We call `set` to update the store:
   - Push the command onto the end of `past`.
   - Call `command.execute(elements)` to replay the operation.
   - Remove that command from the front of `future`.

---

## `handleCopy`

We check if an element is selected. If it is, we deep-clone that element into `copiedElementRef`.

```typescript
handleCopy: (
  selectedElementId: string,
  elements: Element[],
  copiedElementRef: React.MutableRefObject<Element | null>,
) => {
  if (!selectedElementId) return;

  const element = elements.find((el) => el.id === selectedElementId);
  copiedElementRef.current = element ? structuredClone(element) : null;
},
```

---

## `handlePaste`

If an element exists inside `copiedElementRef`, we deep-clone it into `pastedElement` and override its `id` with a newly generated one. We then call `addElement` via Zustand's `get` to push it onto the elements array, which means paste goes through the command pipeline and is undoable.

```typescript
handlePaste: (
  copiedElementRef: React.MutableRefObject<Element | null>,
) => {
  if (!copiedElementRef.current) return;

  const pastedElement = {
    ...structuredClone(copiedElementRef.current),
    id: crypto.randomUUID(),
  };

  get().addElement(pastedElement as Element);
},
```

---

## UI state setters

The following setters update UI related state without going through the command pipeline, they do not create history entries and cannot be undone.

```typescript
setCanvasConfig: (config) =>
  set((state) => ({
    canvasConfig: state.canvasConfig
      ? ({ ...state.canvasConfig, ...config } as CanvasConfig)
      : (config as CanvasConfig),
  })),

setSelectedElementId: (id) => set({ selectedElementId: id }),

setRulerStatus: (rulerStatus: boolean) => set({ rulerStatus }),

setGridStatus: (gridStatus: boolean) => set({ gridStatus }),
```