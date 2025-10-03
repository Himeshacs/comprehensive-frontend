import { lazy } from "react";
import Login from "../Auth/Login";
import UserList from "../UserList";

// Lazy load components for better performance
const Dashboard = lazy(() => import("../Dashboard"));
const Settings = lazy(() => import("../Settings"));
const UserProfile = lazy(() => import("../UserProfile"));

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  protected: boolean;
  requiredRoles?: string[];
  title: string;
  showInNavigation?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/login",
    component: Login,
    protected: false,
    title: "Login",
    showInNavigation: false,
  },
  {
    path: "/",
    component: UserList,
    protected: true,
    title: "Users",
    showInNavigation: true,
  },
  {
    path: "/users",
    component: UserList,
    protected: true,
    title: "Users",
    showInNavigation: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    protected: true,
    title: "Dashboard",
    showInNavigation: true,
  },
  {
    path: "/settings",
    component: Settings,
    protected: true,
    title: "Settings",
    showInNavigation: true,
  },
  {
    path: "/profile",
    component: UserProfile,
    protected: true,
    title: "Profile",
    showInNavigation: true,
  },
  {
    path: "/admin",
    component: Dashboard, // You can create a separate Admin component
    protected: true,
    requiredRoles: ["admin"],
    title: "Admin",
    showInNavigation: true,
  },
];

// Helper function to get navigation items
export const getNavigationItems = (userRoles: string[] = []) => {
  return routes.filter((route) => route.showInNavigation && (!route.requiredRoles || route.requiredRoles.some((role) => userRoles.includes(role))));
};
