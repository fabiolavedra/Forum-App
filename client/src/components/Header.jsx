import { Search, MessageCircle, Bell, User } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import UserContext from "./UserContext";
import { Navigate, NavLink } from "react-router-dom";

const Header = ({ allPosts, search, setSearch, redirect }) => {
  const { loggedUser } = useContext(UserContext);

  const onChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const [clicked, setClicked] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-3 col-span-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <NavLink to={"/fyp"}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl ">F.</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Fumbl.</span>
            </div>
          </NavLink>
        </div>

        {allPosts && (
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-7 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type here to search..."
              className="pl-10 pr-4 py-2 w-80 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={onChange}
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Bell
            className={`w-5 h-5 cursor-pointer ${
              clicked ? "text-red-500 fill-current" : "text-gray-600"
            }`}
            onClick={() => {
              alert(clicked ? "Notifications off" : "Notifications on");
              setClicked(!clicked);
            }}
          />
          <NavLink to={redirect}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </NavLink>
          <span className="text-sm font-medium">
            {loggedUser.firstName} {loggedUser.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
