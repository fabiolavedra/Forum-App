import { useContext } from "react";
import UserContext from "./UserContext";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ postNumber }) => {
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div class="bg-white rounded-2xl p-8 mb-6 shadow-sm">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div class="w-32 h-32 bg-gradient-to-br uppercase from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-md">
          {loggedUser.firstName?.[0] + loggedUser.lastName?.[0]}
        </div>

        <div class="flex-1 text-center md:text-left">
          <div className="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-1 align-bottom">
              {loggedUser.firstName} {loggedUser.lastName}
              {loggedUser.role === "admin" && (
                <h4 className="text-gray-400 font-medium text-xl ">(admin)</h4>
              )}
            </h1>
            <LogOut onClick={() => logout()} className="cursor-pointer" />
          </div>
          <p class="text-gray-500 mb-1">
            @{loggedUser.firstName}_{loggedUser.lastName}
          </p>

          <div class="flex justify-center md:justify-start gap-8">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">{postNumber}</div>
              <div class="text-sm text-gray-500 mt-1">Posts</div>
            </div>

            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">
                {loggedUser.favouritePosts?.length}
              </div>
              <div class="text-sm text-gray-500 mt-1">Favorites</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
