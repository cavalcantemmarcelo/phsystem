import { useEffect } from "react";
import { useRouter } from "next/router";
import isAuthenticated from "@/scripts/IsAuthenticated";

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      isAuthenticated()
        .then((user) => {
          if (!user) {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          router.push("/login");
        });
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
