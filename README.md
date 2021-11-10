# usePassword

## Installation

```bash
$ npm install react-use-password
```

## API

```js
const { passwordValue, onPasswordChanged } = usePassword();
```

you can add an option like this

```js
const { passwordValue, onPasswordChanged } = usePassword({
  length: 2,
  mask: "*",
  timeout: 2000,
});
```

You can destructuring `passwordValue` it has `password` and `passwordHidden`

**password** = password that show `•` in input field

**passwordHidden** = real password for use

---

## Example

```jsx
import { usePassword } from "react-use-password";

const App = () => {
  const { passwordValue, onPasswordChanged } = usePassword();

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            name="password"
            onChange={(event) => onPasswordChanged(event)}
            value={passwordValue.password}
          />
        </div>
      </header>
    </div>
  );
};
```

## Type

```jsx
type usePassword = {
  passwordValue: {
    password: string,
    passwordHidden: string,
  },
  onPasswordChanged: (EventTarget) => void,
};
```

---
