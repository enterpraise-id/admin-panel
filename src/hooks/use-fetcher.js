import Axios from "axios";
import { onMount } from "svelte";
import { writable } from "svelte/store";

const axios = Axios.create({
  baseURL: "https://api.dpelab.co.id",
});

export function useGet(url) {
  const result = writable({
    result: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
  });

  const fetcher = () => {
    result.update((v) => ({
      ...v,
      isError: false,
      isFetching: true,
      isSuccess: false,
    }));

    axios
      .get(url)
      .then((res) => {
        result.update((v) => ({
          ...v,
          result: res.data,
          isSuccess: true,
        }));
      })
      .catch((error) => {
        result.update((v) => ({
          ...v,
          isError: true,
        }));
        console.error(error);
      })
      .finally(() => {
        result.update((v) => ({
          ...v,
          isFetching: false,
        }));
      });
  };

  onMount(() => {
    fetcher();
  });

  return result;
}

export function useLazyGet() {
  const result = writable({
    result: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
  });

  const fetcher = (url) => {
    result.update((v) => ({
      ...v,
      isError: false,
      isFetching: true,
      isSuccess: false,
    }));

    axios
      .get(url)
      .then((res) => {
        result.update((v) => ({
          ...v,
          result: res.data,
          isSuccess: true,
        }));
      })
      .catch((error) => {
        result.update((v) => ({
          ...v,
          isError: true,
        }));
        console.error(error);
      })
      .finally(() => {
        result.update((v) => ({
          ...v,
          isFetching: false,
        }));
      });
  };

  return [fetcher, result];
}

export async function usePost(url, data) {
  return axios.post(url, data).then((res) => res.data);
}

export async function usePut(url, data) {
  return axios.put(url, data).then((res) => res.data);
}

export async function useDelete(url) {
  return axios.delete(url, data).then((res) => res.data);
}
