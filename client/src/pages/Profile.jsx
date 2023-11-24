import Message from "../components/Message";
import Skeleton from "../components/Skeleton";
import { useProfileQuery } from "../features/userApiSlice";
import profile from "../assets/profile.jpg";
import cover from "../assets/cover.jpg";
import { FaBox, FaEdit, FaEnvelope, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Profile = () => {
  const { data, isLoading, isError, error } = useProfileQuery();
  return (
    <>
      <div className="container mx-auto">
        <div className="py-8">

        <Link to={ROUTES.HOME}>
          <button className="btn  btn-primary">Go Home</button>
        </Link>
          {isError && (
            <Message
              variant="alert-error"
              message={error?.data?.message || error?.message}
            />
          )}

          <div className="">
            {isLoading && <Skeleton />}
            {data && (
              <>
                <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-base-200 shadow-xl rounded-lg ">
                  <div className="rounded-t-lg h-32 overflow-hidden">
                    <img
                      className="object-cover object-top w-full"
                      src={cover}
                      alt="profile cover"
                    />
                  </div>
                  <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img
                      className="object-cover object-center h-32"
                      src={profile}
                      alt="profile"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-semibold">{data?.name}</h2>
                    <span className="text-gray-500">
                      {data?.email}
                      <FaEnvelope className="inline-block mx-2" />
                    </span>
                  </div>
                  <ul className="py-4 mt-2 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                      <FaStar className="text-info" />
                      <p>2k</p>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                      <FaHeart className="text-secondary" />
                      <div>10k</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                      <FaBox className="text-accent" />
                      <p>15</p>
                    </li>
                  </ul>
                  <div className="p-6 border-t mx-8 flex items-center justify-center">
                    <button className="w-2/3  btn btn-primary rounded-full text-center">
                      Edit Profile <FaEdit className="inline-block mx-2" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
