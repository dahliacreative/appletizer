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
