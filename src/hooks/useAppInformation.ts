// import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/stores/useAppStore";
import { useEffect } from "react";
import { WebDummyData } from "@/constants/DummyData";

// const fetchInformation = async () => {
//   const response = await fetch("/api/information");
//   if (!response.ok) throw new Error("Gagal mengambil data information");
//   return response.json();
// };

export const useAppInformation = () => {
  const setAppInfo = useAppStore((state) => state.setAppInfo);

  //   const query = useQuery({
  //     queryKey: ["app-information"],
  //     queryFn: fetchInformation,
  //     staleTime: Infinity, // Data dianggap tidak akan basi selamanya selama sesi aktif
  //     gcTime: Infinity,    // Mencegah data dihapus dari cache (sebelumnya cacheTime di v4)
  //   });

  const query = {
    data: WebDummyData,
    isLoading: false,
    error: null,
  };

  useEffect(() => {
    if (query.data) {
      setAppInfo(query.data);
    }
  }, [query.data, setAppInfo]);

  return query;
};
