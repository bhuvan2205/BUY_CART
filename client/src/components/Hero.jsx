import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <>
      <div className="flex bg-base-100 h-screen overflow-hidden shadow-lg">
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">
              Improve Your <span className=" text-secondary">Buy</span>{" "}
              Experience
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Blanditiis commodi cum cupiditate ducimus, fugit harum id
              necessitatibus odio quam quasi, quibusdam rem tempora voluptates.
              Cumque debitis dignissimos id quam vel!
            </p>
            <div className="flex justify-center lg:justify-start mt-6 gap-4">
              <a className="btn btn-primary px-6" href="#">
                Get Started
              </a>
              {!user?._id && (
                <Link className="btn btn-outline px-6 btn-primary" to={ROUTES.REGISTER}>
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          className="hidden lg:block lg:w-1/2"
          style={{ clipPath: "polygon(20% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <img
            src="https://images.pexels.com/photos/972804/pexels-photo-972804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="cart"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
