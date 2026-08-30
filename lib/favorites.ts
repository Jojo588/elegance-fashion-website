"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "niellas-fashionhub-favorites";
const CHANGE_EVENT = "niellas-favorites-change";

function readFavorites(): string[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setFavoriteIds(readFavorites());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);
  const toggleFavorite = useCallback((id: string) => {
    const next = readFavorites().includes(id)
      ? readFavorites().filter((favoriteId) => favoriteId !== id)
      : [...readFavorites(), id];
    setFavoriteIds(next);
    writeFavorites(next);
  }, []);

  return { favoriteIds, isFavorite, toggleFavorite };
}

export function getFavoriteIds(): string[] {
  return typeof window === "undefined" ? [] : readFavorites();
}
