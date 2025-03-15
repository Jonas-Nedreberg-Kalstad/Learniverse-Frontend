import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
    Component that auto scrolls to the top when user navigates throughout the application
*/

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;