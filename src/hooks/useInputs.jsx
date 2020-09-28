import { useState } from 'react';

export const useInputs = (initialValue) => {
  const [inputs, setInputs] = useState(initialValue);

  return {
    inputs,
    setInputs,
    reset: () => setInputs(initialValue),
    bind: {
      onChange: (event) => {
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value,
        });
      },
    },
  };
};
