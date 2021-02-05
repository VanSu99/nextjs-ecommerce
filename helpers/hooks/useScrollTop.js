import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const useScrollTop = () => {
  const location = useLocation();
  const history = useHistory();

  const background = location.state && location.state.background;

  useEffect(() => {
    if (!background && history.action !== "POP") {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0);
      }
    }
  }, [location, background, history]);
  return null;
};

export default useScrollTop;
