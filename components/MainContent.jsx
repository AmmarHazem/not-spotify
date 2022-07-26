import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIDState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import PlaylistSongs from "./PlaylistSongs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const MainContent = () => {
  const selectedPlaylistID = useRecoilValue(playlistIDState);
  const spotify = useSpotify();
  const { data } = useSession();
  const [color, setColor] = useState(null);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [selectedPlaylistID]);

  useEffect(() => {
    if (!selectedPlaylistID) return;
    (async () => {
      try {
        const res = await spotify.getPlaylist(selectedPlaylistID);
        setPlaylist(res.body);
      } catch (e) {
        console.log("--- getPlaylist error");
        console.log(e);
      }
    })();
  }, [spotify, selectedPlaylistID]);

  return (
    <main className="flex-grow text-white relative h-scree overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          {data && data.user && (
            <img
              className="rounded-full w-10 h-10"
              src={data.user.image}
              alt={data.user.name}
            />
          )}
          {data && data.user && <h2>{data.user.name}</h2>}
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {playlist && playlist.images && playlist.images.length > 0 && (
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist.images[0].url}
            alt={playlist.name}
          />
        )}
        {playlist && (
          <>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist.name}
            </h1>
          </>
        )}
      </section>
      <PlaylistSongs />
    </main>
  );
};

export default MainContent;
