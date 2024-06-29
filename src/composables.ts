import axios from "axios";
import { ref } from "vue";
import { authStore } from "./stores";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

import type { AxiosRequestConfig } from "axios";

interface HTTPError {
  statusCode: number;
  message: string;
}

export function useAxios() {
  const router = useRouter();

  const errMsg = ref("");
  const isFetching = ref(false);

  async function fetch<T>(config: AxiosRequestConfig) {
    try {
      isFetching.value = true;
      return (await axios<T>(config)).data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const httpError = err.response.data as HTTPError; // TODO: type guard [?]
          if (httpError.statusCode === 401) {
            // TODO: create function to connect and disconnect users instead of having to
            // repeat/import the same code in different places
            Cookies.remove("token");
            authStore.updateToken(null);
            router.push("/");
            // TODO: add notification
          } else {
            errMsg.value = httpError.message;
          }
        } else {
          errMsg.value = err.message;
        }
      } else {
        errMsg.value = err instanceof Error ? err.message : "Une erreur inattendue s'est produite";
      }
    } finally {
      isFetching.value = false;
    }
  }

  // TODO: add abort signal on unMounted

  return { errMsg, isFetching, fetch };
}
