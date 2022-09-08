import axios from "axios";
import { useRouter } from "next/router";

interface User {
    username: string;
    password: string;
    email?: string;
}
export async function loginUser(user: User) {
  try {
    const { data, status } = await axios.post(
      "http://localhost:8000/v1/auth/login",
      user,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));

    return {data, status};
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function registUser(user: User) {
    try {
      const { data, status } = await axios.post(
        "http://localhost:8000/v1/auth/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      console.log(JSON.stringify(data, null, 4));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }