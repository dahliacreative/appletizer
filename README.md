![applet.izer](https://github.com/dahliacreative/appletizer/blob/main/src/logo.png?raw=true)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](hhttps://github.com/dahliacreative/appletizer/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/appletizer.svg?style=flat)](https://www.npmjs.com/package/appletizer)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/dahliacreative/appletizer/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/dahliacreative/appletizer/tree/main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c40cd0505a0f4eda9f665dc1b9ff9862)](https://www.codacy.com/gh/dahliacreative/appletizer/dashboard?utm_source=github.com&utm_medium=referral&utm_content=dahliacreative/appletizer&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/c40cd0505a0f4eda9f665dc1b9ff9862)](https://www.codacy.com/gh/dahliacreative/appletizer/dashboard?utm_source=github.com&utm_medium=referral&utm_content=dahliacreative/appletizer&utm_campaign=Badge_Coverage)

# About

Applet.izer is a lightweight framework for creating micro frontend applications with react. It allows you to pull applications from multiple hosts into a single "spine" application.

# Install

#### NPM

```
npm i appletizer
```

#### Yarn

```
yarn add appletizer
```

# API

## Configuring Applets

```ts
configureApplets(config: {
  [key: string]: IAppletConfig
})

IAppletConfig {
  host: string
  context?: any
}
```

## Initializing Applets

N.B. The third paramater is optional and is for providing static mocked context for when developing your applet in isolation. Providing this option allows you to pass context to your applet without having to have your spine application running at the same time.

```ts
initializeApplet(key: string, applet: React.FC, developmentContext?: any)
```

# Usage Example

## Prerequisite

In order for applet.izer to work, the server for your applets must host an `asset-manifest.json` at the root pointing to the main entry point.

```json
{
  "files": {
    "main.js": "/path/to/your/bundle.js"
  }
}
```

## Spine Application (with router)

```tsx
import { configureApplets } from "appletizer";

const App = () => {
  const Applets = configureApplets({
    Home: {
      host: "http://localhost:3001",
      context: {
        user: "John Smith",
      },
    },
  });

  return (
    <Router>
      <Route path="/" component={Applets.Home} />
    </Router>
  );

  // Without routing
  // return <Applets.Home />;
};
```

## Applet

```tsx
import { initializeApplet, useAppletContext } from "appletizer";

const App = () => {
  const { user } = useAppletContext();
  return <h1>Hi {context.user}. Welcome to this cool applet!</h1>;
};

initializeApp("Home", App, {});
```

# Developing applets in isolation

In order to develop your applet in isolation (without the spine app running), you will need to run your applet with the following environment variables:

```
REACT_APP_ISOLATED_APPLET=true
REACT_APP_ISOLATED_CONTAINER=yourContainerId
```

- `REACT_APP_ISOLATED_APPLET` this tells applet.izer that you are developing in isolation and therefore the applet will mount when initialized
- `REACT_APP_ISOLATED_CONTAINER` is optional and is where you want your applet to be mounted, we presume usage of CRA therefore if not set, the default is `"root"`

# Contributing

We welcome contibutions, if you would like to contribute, please read our [guidelines](https://github.com/dahliacreative/appletizer/blob/main/CONTRIBUTING.md)

# License

MIT Licensed. Copyright © dahliacreative.
