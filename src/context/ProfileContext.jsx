import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { badgesApi, calculationsApi, profileApi } from '../services/api';
import { useAuth } from './AuthContext';

export const ProfileContext = createContext(null);

export default function ProfileProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [profile,   setProfile]   = useState(null);
  const [trends,    setTrends]    = useState([]);
  const [badges,    setBadges]    = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);

  const fetchAll = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null); setTrends([]); setBadges([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [profileRes, trendsRes, badgesRes] = await Promise.all([
        profileApi.get(),
        calculationsApi.trends(),
        badgesApi.index(),
      ]);
      setProfile(profileRes.data);
      setTrends(trendsRes.data);
      setBadges(badgesRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <ProfileContext.Provider value={{
      profile, trends, badges,
      isLoading, error,
      refetch: fetchAll,
      updateProfile: setProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile doit être utilisé dans ProfileProvider');
  return ctx;
}
