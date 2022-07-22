import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
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
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
        <p className="cursor-pointer hover:text-white">Playlist Name</p>
      </div>
    </div>
  );
};

const SideMenuButton = ({ text, icon }) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default Sidebar;
