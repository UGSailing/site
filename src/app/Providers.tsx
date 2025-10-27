"use client";

import { NextIntlClientProvider } from "next-intl";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
