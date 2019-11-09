## Flow Runtime UI Lite

A React/Redux web app written in TypeScript for running applications built using the
[Boomi Flow](https://boomi.com/platform/flow/) platform.

### Projects Goals

This has been a learning exercise for me to become as familar as I can with the nuts and bolts
of why applications built with Flow behave the way that they do, and how a runtime client should interact with the Flow runtime API.

* Strict typing and interfaces.
* Easy to build and deploy.
* Developer friendly. The project should be easy to run locally and have clear documentation and commenting throughout.
* No more players. The UI should consume services that provide Flow specific settings and styling options.
* No more custom components. The UI should offer a broad range of themed components that are quick and easy to write. Anyone should be able to contribute new components to the project without risking impact to the core codebase. A comprehensive test suite and robust CICD pipeline should ensure that all component contributions are validated and shipped in a timely manner.
* Conform to WCAG standards.
* Provide a comprehensive suite of Flow debugging and monitoring tools. (Note for devs - this project uses Redux devtools).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting set up

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To initialze a new Flow state append your URL with:

```
/<your-tenant-id>/play/default?flow-id=<your-flow-id>&flow-version-id=<your-flow-version-id>
```

To join an existing Flow state append your URL with:

```
/<your-tenant-id>/play/default?join=<your-state-id>
```

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Yawwwwwwwn... but TODO

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This project has not been ejected yet... hopefully won't need to!
