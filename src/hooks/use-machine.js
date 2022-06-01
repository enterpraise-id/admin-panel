import { get, writable } from "svelte/store";

export function useMachine(options) {
  let currentStep = 0;
  let isError = false;
  let isFetching = false;
  let isSuccess = false;
  let errorMessage;

  const steps = options.steps;
  const state = writable(options.initialValues);

  const submit = () => {
    const data = get(state);
    console.log(data);
  };

  const next = async () => {
    isError = false;
    errorMessage = undefined;
    console.log('eeee')
    try {
      
      const _state = get(state);
      
      const key = steps[currentStep].key;
      console.log(_state[key])
      console.log(steps[currentStep].validation.validate())
      await steps[currentStep].validation.validate(_state[key]);
      console.log('o')
      currentStep += 1;
    } catch ({ value, path, type, errors, params, inner, name, message }) {
      isError = true;
      errorMessage = message;
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      currentStep -= 1;
    }
  };

  return [
    submit,
    {
      steps: options.steps,
      currentStep,
      next,
      prev,
      state,
      isError,
      isFetching,
      isSuccess,
      errorMessage,
    },
  ];
}
