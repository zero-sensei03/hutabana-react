import type { BaseResponse } from "@/interfaces/base.interface";
import type { CategoryModuleRes } from "@/interfaces/public.interface";
import { api } from "@/lib/axios";

export const getModulePublic = async (): Promise<
  BaseResponse<CategoryModuleRes[]>
> => {
  const { data } = await api.get(`/public/module-category`);
  return data;
};
