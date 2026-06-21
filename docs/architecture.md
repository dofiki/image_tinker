# Architecture

![Architecture diagram](/assets/architecture.png)

> _Note: This diagram is meant to illustrate the overall flow, not the literal file or module structure._

### Flow

1. The user performs an action, for example changing the width of an image.
2. The action is captured inside the components.
3. Event listeners pick up the raw interaction.
4. Event handlers process the interaction and update the application state.
5. The updated state is written to the Zustand store, which holds the global application state.
6. The store change is propagated back to the components so they can reflect the new state.
7. The store also notifies the renderer, which triggers a re render and produces an updated canvas.

## Documentation

For an in-depth explanation of the codebase :

- [Types](types.md)
- [Store](store.md)
- [systems / Zoom](systems/zoom.md)
- [systems / Pan](systems/pan.md)
- [sytems / Rotate](systems/rotate.md)
- [sytems / Drag](systems/drag.md)
- [sytems / Resize](systems/resize.md)
