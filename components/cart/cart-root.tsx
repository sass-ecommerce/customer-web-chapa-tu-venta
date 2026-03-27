"use client";

import { CartSheet } from "./cart-sheet";
import { CartToast } from "./cart-toast";

export function CartRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartSheet />
      <CartToast />
    </>
  );
}
