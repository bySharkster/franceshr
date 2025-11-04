import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Hook to manage authentication redirect URLs based on query parameters
 * Handles both 'next' and 'service' params to construct the forwarding URL
 */
export function useAuthRedirect() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const service = searchParams.get("service");
  const [forwardingUrl, setForwardingUrl] = useState<string>("");

  useEffect(() => {
    if (next && service) {
      setForwardingUrl(`${next}?service=${service}`);
    } else {
      setForwardingUrl(next || "/app");
    }
  }, [next, service]);

  return { forwardingUrl, next, service };
}
