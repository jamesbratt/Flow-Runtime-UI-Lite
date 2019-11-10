## Lets talk about application state

### Page State
This tells our application what it needs to render. When the store is initially invoked, the page state
is pretty much empty except for some placeholders. The store is waiting to be populated with an
invoke response returned from the engine (the response from an invoke request tells the UI what to render etc).
Once this object describing the Flow has been set in state, all React components subscribed to the
store will render whatever the store is telling it to.

Various actions allow for the UI to manipulate the page state based on how the user is
interacting with the UI e.g. typing into an input field etc.

Another key point, is that whatever is in page state is what will get sent to the engine
when a user triggers a "forward" (clicking an outcome) or "sync" (triggering a page condition) event.

Page state is the single source of truth for the UI.

### Component Registry
Really simple - Just a bunch of key value pairs. The key being the component name and the value the
corresponding React component. Holding this in our Redux store allows for React components to be rendered
on the fly based on what components the page state is telling the UI to render.

### Navigation
TODO

### Notifications
TODO

### Settings
Such as tenant ID and theme