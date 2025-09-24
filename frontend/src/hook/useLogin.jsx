import { useState } from "react";
import localSession from "../utils/localSession";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localSession.setItem("user", JSON.stringify(user));
                console.log("User logged in successfully!");
                return { ok: true, user: user };
            } else {
                setError("Login failed");
                return { ok: false, error: "Login failed" };
            }
        } catch (error) {
            setError("Network error");
            return { ok: false, error: "Network error" };
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error };
}