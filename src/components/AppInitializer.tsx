import { useAppInformation } from "@/hooks/useAppInformation";
import EducationLoading from "@/components/loading/PageLoading";
import FetchError from "./errors/FetchError";

interface Props {
  children: React.ReactNode;
}

export default function AppInitializer({ children }: Props) {
  const { isLoading, error } = useAppInformation();

  if (isLoading) {
    return <EducationLoading />;
  }

  if (error) {
    return (
      <FetchError description="Failed to load application configuration from the server" />
    );
  }

  return <>{children}</>;
}
