## Lets talk about Flow state

So currently the Redux store is split into three parts - pageState, componentRegistry and Components Fetching objectData.
These parts of the store are pretty self explanatory, but here goes...

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

### Components Fetching objectData
This is literally just an array of page component IDs. An ID gets added to the store whilst that specific page
component is in a state of fetching objectdata. Once the objectdata for that component has been received,
the ID is removed.
The reason for this is so that the UI has a way of tracking which components are still waiting for data.
The engine delegates the responsibility of retrieving service data to the
client. This means that there is potentially multiple asynchronous requests being made by individual
components. We could abstract the initiation of these requests away from the components and wait for each one to resolve before rendering the UI (which would negate the need for this store), however, this would
offer a poor UX as each objectdata request can take upwards of 1 second to make. This solution prevents blocking other components from rendering on the page.
