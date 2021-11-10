import { useState, useRef } from "react";

const _default = {
  length: 1,
  timeout: 1000,
  mask: "•",
};

const usePassword = (opt = _default) => {
  const options = {
    length: opt.length ?? _default.length,
    timeout: opt.timeout ?? _default.timeout,
    mask: opt.mask ?? _default.mask,
  };

  const [passwordValue, setPasswordValue] = useState({
    password: "",
    passwordHidden: "",
  });

  let timer = useRef(null);

  const hidePassword = (value) => {
    setPasswordValue((prev) => ({
      ...prev,
      password: value.replace(/./g, options.mask),
    }));
  };

  const trigger = (callback) => (value) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(value), options.timeout);
  };

  const onPasswordChanged = (event) => {
    const { value } = event.target;
    const hiddenPassValue = passwordValue.passwordHidden;

    let offset = value.length - hiddenPassValue.length;

    if (offset > 0) {
      if (!/^(•)+[A-Za-z0-9](•)+$/g.test(value)) {
        setPasswordValue((prev) => ({
          ...prev,
          passwordHidden:
            hiddenPassValue +
            value.substring(
              hiddenPassValue.length,
              hiddenPassValue.length + offset
            ),
        }));
      }
    } else if (offset < 0) {
      setPasswordValue((prev) => ({
        ...prev,
        passwordHidden: hiddenPassValue.substring(
          0,
          hiddenPassValue.length + offset
        ),
      }));
    }

    if (!/^(•)+[A-Za-z0-9](•)+$/g.test(value)) {
      setPasswordValue((prev) => ({
        ...prev,
        password:
          value
            .substring(0, value.length - options.length)
            .replace(/./g, options.mask) +
          value.substring(value.length - options.length, value.length),
      }));
      trigger(hidePassword)(value);
    }
  };

  return { passwordValue, onPasswordChanged };
};

export default usePassword;
