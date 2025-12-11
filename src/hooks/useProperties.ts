import { useEffect, useState } from "react";
import { fetchProperties } from "../api/properties";
import type { Property } from "../types";

interface UsePropertiesResult {
    properties: Property[];
    isLoading: boolean;
    error: Error | null;
}

export function useProperties(): UsePropertiesResult {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function load() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchProperties();

                if (!isMounted) return;

                setProperties(data);
            } catch (err: unknown) {
                if (!isMounted) return;

                const normalizedError =
                    err instanceof Error ? err : new Error("Failed to load properties");

                setError(normalizedError);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    return { properties, isLoading, error };
}