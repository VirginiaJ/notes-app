interface PostRequestParams {
  url: string;
  data: Record<string, any> | null;
}

interface RequestParams {
  method: "GET" | "POST" | "DELETE";
  headers?: HeadersInit;
  data?: any;
}

const request = async (url: string, params: RequestParams) => {
  const { method, headers, data } = params;

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const json = method !== "DELETE" ? await res.json() : {};

    return json;
  } catch (error) {
    console.error("There was a problem with a fetch operation:", error);
  }
};

export const getRequest = async (url: string) =>
  request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postRequest = async ({ url, data = {} }: PostRequestParams) =>
  request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

export const deleteRequest = async (url: string, id: string) =>
  request(`${url}/${id}`, {
    method: "DELETE",
  });
