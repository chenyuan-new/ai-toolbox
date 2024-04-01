"use client";

import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { ProModal } from "@/components/pro-modal";

export const ModalProvider = () => {
const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};
