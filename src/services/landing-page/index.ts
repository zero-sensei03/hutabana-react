import { useQuery } from "@tanstack/react-query";
import { getModulePublic } from "./http";

export const useGetModulePublic = () => {
  return useQuery({
    queryKey: ["getSalesStaff"],
    queryFn: () => getModulePublic(),
    staleTime: 60 * 60 * 1000,
    enabled: true,
  });
};
