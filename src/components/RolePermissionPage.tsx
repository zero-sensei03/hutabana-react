import NotFound from "@/pages/errors/PageNotFound";
import { useModuleStore } from "@/stores/useModuleStore";
import React from "react";

interface RolePermissionPageProps {
  categorypermission?: string | string[];
  permissionName?: string | string[];
  children?: React.ReactNode;
}

const RolePermissionPage = ({
  categorypermission,
  permissionName,
  children,
}: RolePermissionPageProps) => {
  const { moduleInfo } = useModuleStore();

  if (!moduleInfo || moduleInfo.length === 0) {
    return <NotFound />;
  }

  const categories = categorypermission
    ? Array.isArray(categorypermission)
      ? categorypermission
      : [categorypermission]
    : [];

  const permissions = permissionName
    ? Array.isArray(permissionName)
      ? permissionName
      : [permissionName]
    : [];

  let hasAccess = false;

  if (categories.length > 0 && permissions.length > 0) {
    hasAccess = moduleInfo.some(
      (cat) =>
        categories.includes(cat.slug) &&
        cat.modules.some(
          (mod) => mod.is_active && permissions.includes(mod.slug),
        ),
    );
  } else if (categories.length > 0) {
    hasAccess = moduleInfo.some((cat) => categories.includes(cat.slug));
  } else if (permissions.length > 0) {
    hasAccess = moduleInfo.some((cat) =>
      cat.modules.some(
        (mod) => mod.is_active && permissions.includes(mod.slug),
      ),
    );
  }

  if (hasAccess) {
    return children;
  } else {
    return <NotFound />;
  }
};

export default RolePermissionPage;
