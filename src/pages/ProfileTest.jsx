import { useEffect, useState } from "react";
import { fetchProfile } from "../api";

export const ProfileTest = ({ token = null, userId = "73ccb707-e544-4e57-999f-bba850143f26" }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile(token, userId);
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [token, userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>profile</h1>
      <h2>{profile.username}</h2>
    </div>
  );
};


