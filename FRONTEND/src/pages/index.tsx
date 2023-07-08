// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Spinner Import
import Spinner from "src/@core/components/spinner";

const Home = () => {
  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    router.replace("/home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Spinner />;
};

export default Home;
