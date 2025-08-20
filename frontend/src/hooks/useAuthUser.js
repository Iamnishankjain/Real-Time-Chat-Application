import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,  // auth checks should not retry because it can cause unauthenticated access
  });
  const {isLoading: authUser.isLoading, authUser: authUser.data?.user};
}
export default useAuthUser;