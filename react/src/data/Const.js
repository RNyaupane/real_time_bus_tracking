// Const.js
import useMediaQuery from "@mui/material/useMediaQuery";

const getSectionStyle = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return {
    backgroundImage: isLargeScreen ? "url('public/bgAuth.png')" : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };
};

export { getSectionStyle };
