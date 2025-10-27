"use client";

import { locales } from "@/i18n/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function LocaleSwitcher() {
  const router = useRouter();
  const [value, setValue] = useState<string>("en");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )locale=([^;]+)/);
      if (match?.[1]) setValue(decodeURIComponent(match[1]));
    }
  }, []);

  function setlocale(v: string) {
    setValue(v);
    // Persist for 1 year
    document.cookie = `locale=${encodeURIComponent(v)}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <label htmlFor="locale" className="text-sm text-gray-600" onClick={() => setlocale('default')}>Lang</label>
      <select
        id="locale"
        value={value}
        onChange={(e)=>setlocale(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        {locales.filter((loc) => loc !== 'default').map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
