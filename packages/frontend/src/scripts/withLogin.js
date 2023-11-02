import { useRouter } from "next/router";
import { useEffect } from "react";
import isAuthenticated from "./IsAuthenticated";

const WithLogin = (Component) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push("/login");
      }
    }, []);

    return <Component {...props} />;
  };
};

export default WithLogin;
