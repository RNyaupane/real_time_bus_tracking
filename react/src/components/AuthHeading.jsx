import React from "react";

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const AuthHeading = (props) => {
  const greeting = getGreeting();

  return (
    <>
      <div className="text-center md:text-left">
        <label className="mr-5 text-2xl font-semibold">Hello, {greeting}</label>
      </div>
      <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
          {props.heading}
        </p>
      </div>
    </>
  );
};

export default AuthHeading;
