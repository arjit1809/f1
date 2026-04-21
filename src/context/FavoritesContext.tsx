"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface FavoritesContextType {
  favoriteDrivers: string[];
  favoriteTeams: string[];
  toggleDriverFavorite: (slug: string) => void;
  toggleTeamFavorite: (id: string) => void;
  isDriverFavorite: (slug: string) => boolean;
  isTeamFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoriteDrivers: [],
  favoriteTeams: [],
  toggleDriverFavorite: () => {},
  toggleTeamFavorite: () => {},
  isDriverFavorite: () => false,
  isTeamFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteDrivers, setFavoriteDrivers] = useState<string[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const drivers = localStorage.getItem("f1_fav_drivers");
      const teams = localStorage.getItem("f1_fav_teams");
      if (drivers) setFavoriteDrivers(JSON.parse(drivers));
      if (teams) setFavoriteTeams(JSON.parse(teams));
    } catch (e) {
      // localStorage not available (SSR guard)
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("f1_fav_drivers", JSON.stringify(favoriteDrivers));
  }, [favoriteDrivers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("f1_fav_teams", JSON.stringify(favoriteTeams));
  }, [favoriteTeams, hydrated]);

  const toggleDriverFavorite = useCallback((slug: string) => {
    setFavoriteDrivers(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  }, []);

  const toggleTeamFavorite = useCallback((id: string) => {
    setFavoriteTeams(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }, []);

  const isDriverFavorite = useCallback(
    (slug: string) => favoriteDrivers.includes(slug),
    [favoriteDrivers]
  );

  const isTeamFavorite = useCallback(
    (id: string) => favoriteTeams.includes(id),
    [favoriteTeams]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteDrivers,
        favoriteTeams,
        toggleDriverFavorite,
        toggleTeamFavorite,
        isDriverFavorite,
        isTeamFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
