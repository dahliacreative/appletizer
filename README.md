[![CircleCI](https://dl.circleci.com/status-badge/img/gh/dahliacreative/appletizer/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/dahliacreative/appletizer/tree/main) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/c40cd0505a0f4eda9f665dc1b9ff9862)](https://www.codacy.com/gh/dahliacreative/appletizer/dashboard?utm_source=github.com&utm_medium=referral&utm_content=dahliacreative/appletizer&utm_campaign=Badge_Grade) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/c40cd0505a0f4eda9f665dc1b9ff9862)](https://www.codacy.com/gh/dahliacreative/appletizer/dashboard?utm_source=github.com&utm_medium=referral&utm_content=dahliacreative/appletizer&utm_campaign=Badge_Coverage)

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

```ts
initializeApplet(key: string, applet: React.FC)
```

# Usage Example

## Spine Application

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
};
```

## Applet

```tsx
import { initializeApplet, useAppletContext } from "appletizer";

const App = () => {
  const { user } = useAppletContext();
  return <h1>Hi {context.user}. Welcome to this cool applet!</h1>;
};

initializeApp("Home", App);
```
