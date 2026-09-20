"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { trackCheckoutStarted } from "@/lib/analytics";

/**
 * Paddle checkout on the APPROVED domain (yourpulse.io).
 *
 * The Pulse app (app.yourpulse.io) creates a Paddle transaction, then sends
 * the buyer here as /checkout?_ptxn=<transactionId>&return=<app-origin>. Paddle
 * opens the checkout on THIS domain (which is domain-approved) so the app's own
 * subdomain never needs approval. On success Paddle returns to the app's billing
 * page.
 *
 * Env (set in this project's hosting):
 *   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN  : live client-side token
 *   NEXT_PUBLIC_PADDLE_ENV           : "production" (default) or "sandbox"
 */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Paddle?: any;
  }
}

export function CheckoutClient() {
  const [error, setError] = useState<string | null>(null);
  const opened = useRef(false);

  function openCheckout() {
    if (opened.current) return;
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";
    const params = new URLSearchParams(window.location.search);
    const txn = params.get("_ptxn");
    const ret = params.get("return");

    if (!txn) { setError("No transaction to pay for."); return; }
    if (!window.Paddle || !token) { setError("Checkout is not configured."); return; }

    opened.current = true;
    try {
      if (env === "sandbox") window.Paddle.Environment.set("sandbox");
      window.Paddle.Initialize({ token });
      const successUrl = ret ? `${ret.replace(/\/$/, "")}/billing?checkout=success` : undefined;
      window.Paddle.Checkout.open({
        transactionId: txn,
        settings: { displayMode: "overlay", theme: "dark", allowLogout: false, ...(successUrl ? { successUrl } : {}) },
      });
      trackCheckoutStarted();
    } catch {
      setError("Could not open the checkout. Please try again.");
      opened.current = false;
    }
  }

  // If the script was already present (client nav), open immediately.
  useEffect(() => {
    if (window.Paddle) openCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" onLoad={openCheckout} />
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <div>
          {error ? (
            <>
              <p style={{ fontWeight: 600, color: "#e11d48" }}>{error}</p>
              <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>Please return to your billing page and try again.</p>
            </>
          ) : (
            <p style={{ opacity: 0.75 }}>Opening secure checkout…</p>
          )}
        </div>
      </main>
    </>
  );
}
