import { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import getFriendsList from "../components/DisplayUser/userData";

export interface User {
  name: {
    firstname: string;
    lastname: string;
  };
  _id: string;
  username: string;
}

export interface SignInData {
  username: string;
  password: string;
}

interface Auth {
  user: User | null;
  signIn: (data: SignInData) => void;
}

export const AuthGuardContext = createContext({} as Auth);

export default function AuthGuard({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const signIn = async (loginData: SignInData) => {
    try {
      const { data } = await Axios.post(
        "http://localhost:9000/login",
        loginData
      );
      setUser(data.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [user]);

  return (
    <AuthGuardContext.Provider value={{ user, signIn }}>
      {children}
    </AuthGuardContext.Provider>
  );
}
