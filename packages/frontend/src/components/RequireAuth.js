import { useEffect } from "react";
import { useRouter } from "next/router";

const RequireAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    const isAuthenticated = () => {
      const token = sessionStorage.getItem("token");
      return !!token;
    };

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      // loading spinner or message here
      return null;
    }
  };
};

export default RequireAuth;
