import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { store } from "./store";
import Cookies from "js-cookie";

import type { Ref } from "vue";
import type { AxiosRequestConfig } from "axios";

interface HTTPError {
  statusCode?: number;
  message: string;
}

interface ComposableOptions {
  immediate: boolean;
}

// TODO: add abort signal on unMounted
export function useAxios<T>(opts: ComposableOptions = { immediate: false }) {
  const router = useRouter();
  const isFetching = ref(opts.immediate);
  const data: Ref<T | null> = ref(null);
  const error = ref<HTTPError | null>(null);

  async function fetch(config: AxiosRequestConfig) {
    if (!isFetching.value) {
      isFetching.value = true;
    }
    try {
      data.value = (await axios<T>(config)).data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const httpError = err.response.data as HTTPError; // TODO: type guard [?]
          if (httpError.statusCode === 401) {
            // TODO: create function to connect and disconnect users instead of having to
            // repeat/import the same code in different places
            Cookies.remove("token");
            store.token = null;
            store.notifs.push({
              type: "error",
              message: "Votre session a expiré, reconnectez-vous"
            });
            router.push("/");
            // TODO: add notification
          } else {
            error.value = httpError;
          }
        } else {
          error.value = { message: err.message };
        }
      } else {
        error.value = {
          message: err instanceof Error ? err.message : "Une erreur inattendue s'est produite"
        };
      }
    } finally {
      isFetching.value = false;
    }
  }

  return { isFetching, data, error, fetch };
}
