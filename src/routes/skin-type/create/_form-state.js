import { get, writable } from "svelte/store";

export const formState = writable({
  name: "",
});
