"use client";

import { ClientSideOptionsProvider } from "@c15t/nextjs/client";
import { useConsentManager } from "@c15t/react";
import { posthog } from "posthog-js";
import { useEffect, useRef } from "react";

export function ConsentManagerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showPopup, saveConsents, setShowPopup } = useConsentManager();
  const didAutoAccept = useRef(false);

  useEffect(() => {
    if (!showPopup || didAutoAccept.current) return;
    didAutoAccept.current = true;
    saveConsents("all");
    setShowPopup(false);
  }, [showPopup, saveConsents, setShowPopup]);

  return (
    <ClientSideOptionsProvider
      callbacks={{
        onConsentSet({ preferences }) {
          if (preferences.measurement) {
            posthog.opt_in_capturing();
          } else {
            posthog.opt_out_capturing();
          }
        },
      }}
    >
      {children}
    </ClientSideOptionsProvider>
  );
}
