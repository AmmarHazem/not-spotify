import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIDState } from "../atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState();
  const [selectedPlaylistID, setSelectedPlaylistID] =
    useRecoilState(playlistIDState);
  const spotifyAPI = useSpotify();

  useEffect(() => {
    (async () => {
      if (spotifyAPI.getAccessToken()) {
        const response = await spotifyAPI.getUserPlaylists();
        setPlaylists(response.body.items);
        if (response.body.items && response.body.items.length > 0) {
          setSelectedPlaylistID(response.body.items[0].id);
        }
      }
    })();
  }, [session, spotifyAPI]);

  // console.log({ selectedPlaylistID });

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen sm:max-w-[15rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <SideMenuButton text="Home" icon={<HomeIcon className="h-5 w-5" />} />
        <SideMenuButton
          text="Search"
          icon={<SearchIcon className="h-5 w-5" />}
        />
        <SideMenuButton
          text="Your Library"
          icon={<LibraryIcon className="h-5 w-5" />}
        />
        <SideMenuButton
          onClick={() => signOut()}
          text="Logout"
          icon={<LogoutIcon className="h-5 w-5" />}
        />
        <hr className="border-t-[0.1px] border-gray-900" />
        <SideMenuButton
          text="Create Playlist"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        />
        <SideMenuButton
          text="Liked Songs"
          icon={<HeartIcon className="h-5 w-5" />}
        />
        <SideMenuButton
          text="Your Episodes"
          icon={<RssIcon className="h-5 w-5" />}
        />
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlists */}
        {playlists &&
          playlists.map((item) => {
            return (
              <p
                onClick={() => setSelectedPlaylistID(item.id)}
                key={item.id}
                className="cursor-pointer hover:text-white"
              >
                {item.name}
              </p>
            );
          })}
      </div>
    </div>
  );
};

const SideMenuButton = ({ text, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 hover:text-white"
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default Sidebar;
