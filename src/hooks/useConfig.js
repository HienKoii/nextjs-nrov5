import { useEffect, useState } from "react";

export default function useConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`../config/${process.env.NEXT_PUBLIC_SITE_ID}.json?t=${new Date().getTime()}`)
      .then((response) => response.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error("Lỗi khi tải config.json", error))
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
}
