import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import spotifyAPI from "../lib/spotify";

const useSpotify = () => {
  const { data } = useSession();

  useEffect(() => {
    if (!data) return;
    if (data.error === "refreshAccessTokenError") {
      signIn();
    }
    spotifyAPI.setAccessToken(data.user.accessToken);
  }, [data]);

  return spotifyAPI;
};

export default useSpotify;
