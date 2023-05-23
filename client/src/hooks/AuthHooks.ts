import { useContext } from "react";
import { AuthGuardContext } from "../contexts/AuthGuard";

export function useAuth() {
    return useContext(AuthGuardContext)
}