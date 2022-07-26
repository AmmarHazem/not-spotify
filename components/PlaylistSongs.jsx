import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import PlaylistSong from "./PlaylistSong";

const PlaylistSongs = () => {
  const playlist = useRecoilValue(playlistState);
  const songs = playlist?.tracks?.items || [];

  return (
    <section className="playlist-songs text-white flex flex-col px-8 space-y-1 pb-28">
      {songs.map((item, i) => {
        return (
          <PlaylistSong key={item.track.id} order={i + 1} track={item.track} />
        );
      })}
    </section>
  );
};

export default PlaylistSongs;
