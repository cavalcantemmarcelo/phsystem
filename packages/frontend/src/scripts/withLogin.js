import { useRouter } from "next/router";
import { useEffect } from "react";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return !!token;
};

const withLogin = (Component) => {
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

export default withLogin;
