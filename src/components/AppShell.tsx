"use client";

/**
 * AppShell Component
 * 
 * This is the main layout component that provides the application shell structure.
 * It includes:
 * - Sidebar navigation with expandable modules
 * - Header with search and notifications
 * - Dark mode toggle functionality
 * - User profile section with logout
 * - Responsive design that hides sidebar on mobile
 */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AUTH_COOKIE_NAME, isTokenExpired } from "@/lib/auth";
import { deleteCookie, getCookie } from "@/lib/cookies";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { closeSocket } from "@/lib/socket";
import { searchGlobal, type GlobalSearchItem } from "@/lib/globalSearch";

/**
 * Navigation Item Component
 * 
 * Renders a single navigation item with proper styling and active state handling.
 * Can be used as a link or button depending on whether href is provided.
 */
function NavItem({ href, label, badge, isActive, onClick, children }: {
  href?: string;
  label: string;
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = isActive ?? (href ? pathname === href : false);

  // Use Link component if href is provided, otherwise use button
  const Wrapper = href ? Link : "button";

  return (
    <Wrapper
      href={href || "#"}
      onClick={onClick}
      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors w-full text-left ${
        active
          ? "bg-green-100 text-green-900"
          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      <span>{label}</span>
      <div className="flex items-center gap-2">
        {/* Display badge if provided */}
        {badge != null ? (
          <span className="rounded-full bg-zinc-200 px-2 text-xs text-zinc-700">{badge}</span>
        ) : null}
        {/* Render children (typically expand/collapse icon) */}
        {children}
      </div>
    </Wrapper>
  );
}

/**
 * Sub Navigation Item Component
 * 
 * Renders a sub-navigation item for nested navigation structure.
 * Always rendered as a link with proper active state styling.
 */
function SubNavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-green-50 text-green-700 font-medium"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
      }`}
    >
      {label}
    </Link>
  );
}

/**
 * Main AppShell Component
 * 
 * Provides the complete application layout with sidebar, header, and main content area.
 * Handles dark mode functionality and navigation state management.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // State for managing expanded navigation modules
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GlobalSearchItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; time: string; unread: boolean }>>([
    { id: "n1", title: "System", message: "New camera connected: Gate-2", time: "2 min ago", unread: true },
    { id: "n2", title: "Alert", message: "PPE violation detected in Zone A", time: "12 min ago", unread: true },
    { id: "n3", title: "Report", message: "Daily occupancy report is ready", time: "1 hour ago", unread: false },
    { id: "n4", title: "Maintenance", message: "Storage usage reached 80%", time: "3 hours ago", unread: false },
    { id: "n5", title: "Info", message: "New user added: safety.officer@company.com", time: "Yesterday", unread: false },
  ]);

  const unreadCount = notifications.reduce((acc, n) => acc + (n.unread ? 1 : 0), 0);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const el = notificationsRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNotificationsOpen]);

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const el = userMenuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }
    setSearchResults(searchGlobal(q, 8));
  }, [searchQuery]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const el = searchRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME);
    if (!token || isTokenExpired(token)) {
      if (token) {
        deleteCookie(AUTH_COOKIE_NAME);
      }
      router.replace(`/login?next=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  }, [pathname, router]);

  /**
   * Auto-expand module based on current pathname
   * Only auto-expand if no modules are currently expanded (initial state)
   */
  useEffect(() => {
    const getModuleFromPath = (path: string): string | null => {
      if (path.startsWith('/in-out')) return 'in-out';
      if (path.startsWith('/parking')) return 'parking';
      if (path.startsWith('/ppe')) return 'ppe';
      if (path.startsWith('/utility')) return 'utility';
      if (path.startsWith('/people')) return 'people';
      if (path.startsWith('/fire')) return 'fire';
      if (path.startsWith('/configuration')) return 'configuration';
      return null;
    };

    // Only auto-expand on initial load or when no modules are expanded
    if (expandedModules.size === 0) {
      const currentModule = getModuleFromPath(pathname);
      if (currentModule) {
        setExpandedModules(new Set([currentModule]));
      }
    }
  }, [pathname]);

  /**
   * Get page title and description based on current pathname
   */
  const getPageInfo = () => {
    const pageMap: Record<string, { title: string; description: string }> = {
      "/dashboard": {
        title: "Dashboard",
        description: "System overview and real-time monitoring"
      },
      "/in-out": {
        title: "In / Out Detection Dashboard",
        description: "Real-time monitoring of vehicle entries and exits"
      },
      "/in-out/reports": {
        title: "In / Out Reports",
        description: "Historical data and analytics reports"
      },
      "/in-out/events": {
        title: "Events & Alerts",
        description: "Real-time events and alert management"
      },
      "/in-out/settings": {
        title: "In / Out Settings",
        description: "Configuration and system settings"
      },
      "/parking": {
        title: "Parking Detection Dashboard",
        description: "Real-time parking space monitoring"
      },
      "/parking/reports": {
        title: "Parking Reports",
        description: "Parking analytics and utilization reports"
      },
      "/parking/events": {
        title: "Parking Events & Alerts",
        description: "Real-time parking events and alert management"
      },
      "/parking/settings": {
        title: "Parking Settings",
        description: "Parking detection system settings"
      },
      "/ppe": {
        title: "PPE Detection Dashboard",
        description: "Personal protective equipment monitoring"
      },
      "/ppe/reports": {
        title: "PPE Reports",
        description: "PPE compliance and violation reports"
      },
      "/ppe/violations": {
        title: "PPE Violations",
        description: "Safety violations and incidents"
      },
      "/ppe/settings": {
        title: "PPE Settings",
        description: "PPE detection system configuration"
      },
      "/utility": {
        title: "Utility Reader Dashboard",
        description: "Automated meter reading and monitoring"
      },
      "/utility/reports": {
        title: "Utility Reports",
        description: "Meter reading history and analytics"
      },
      "/utility/events-alerts": {
        title: "Events & Alerts",
        description: "Utility monitoring notifications"
      },
      "/utility/settings": {
        title: "Utility Settings",
        description: "Utility reader system configuration"
      },
      "/people": {
        title: "People Detection Dashboard",
        description: "People counting and tracking monitoring"
      },
      "/people/counting": {
        title: "People Counting",
        description: "Real-time people counting analytics"
      },
      "/people/zones": {
        title: "People Zones",
        description: "Manage monitoring zones and areas"
      },
      "/people/settings": {
        title: "People Settings",
        description: "People detection system settings"
      },
      "/fire": {
        title: "Fire / Smoke Dashboard",
        description: "Fire and smoke detection monitoring"
      },
      "/fire/events": {
        title: "Events & Alerts",
        description: "Fire detection events and alert management"
      },
      "/fire/settings": {
        title: "Fire Settings",
        description: "Fire detection system configuration"
      },
      "/configuration/input-streams": {
        title: "Input Streams",
        description: "Configure camera and video input streams"
      },
      "/configuration/audio-streams": {
        title: "Audio Streams",
        description: "Configure audio input streams"
      },
      "/configuration/routing": {
        title: "Routing",
        description: "Configure stream routing to detection modules"
      },
      "/configuration/schedule": {
        title: "Schedule",
        description: "Configure time-based rules and schedules"
      },
      "/configuration/user-management": {
        title: "User Management",
        description: "Manage users and role-based access control"
      },
      "/configuration/notifications": {
        title: "Notifications",
        description: "Configure notification channels and settings"
      },
      "/configuration/zones": {
        title: "Zones",
        description: "Configure monitoring zones and areas"
      }
    };

    // Return exact match or closest parent
    if (pageMap[pathname]) {
      return pageMap[pathname];
    }
    
    // Find closest parent path
    const parentPath = Object.keys(pageMap).find(path => pathname.startsWith(path));
    return parentPath ? pageMap[parentPath] : {
      title: "Dashboard",
      description: "System overview and real-time monitoring"
    };
  };

  const pageInfo = getPageInfo();

  /**
   * Toggle the expanded state of a navigation module
   * @param key - The module key to toggle
   */
  const toggleModule = (key: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key); // Collapse if already expanded
      } else {
        next.add(key); // Expand if collapsed
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex min-h-screen w-full">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white p-4 md:flex dark:border-white/10 dark:bg-zinc-950">
          {/* Logo Section */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3-9 4 18 3-9h4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Canberra</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Monitoring System</div>
            </div>
          </div>

          {/* Main Navigation Modules */}
          <nav className="flex flex-col gap-1 mb-6">
            {/* Dashboard Link */}
            <NavItem href="/dashboard" label="Dashboard" />
            
            {/* In / Out Detection Module - Expandable */}
            <div>
              <NavItem
                label="In / Out Detection"
                badge={12} // Badge showing number of alerts/events
                onClick={() => toggleModule("in-out")}
              >
                {/* Expand/Collapse Arrow Icon */}
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("in-out") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {/* Sub-navigation items - shown when module is expanded */}
              {expandedModules.has("in-out") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/in-out" label="Dashboard" />
                  <SubNavItem href="/in-out/reports" label="Reports" />
                  <SubNavItem href="/in-out/events" label="Events & Alerts" />
                  <SubNavItem href="/in-out/settings" label="Settings" />
                </div>
              )}
            </div>

            {/* Parking Detection Module - Expandable */}
            <div>
              <NavItem
                label="Parking Detection"
                badge={3} // Badge showing number of alerts/events
                onClick={() => toggleModule("parking")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("parking") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {expandedModules.has("parking") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/parking" label="Dashboard" />
                  <SubNavItem href="/parking/reports" label="Reports" />
                  <SubNavItem href="/parking/events" label="Events & Alerts" />
                  <SubNavItem href="/parking/settings" label="Settings" />
                </div>
              )}
            </div>

            {/* PPE Detection Module - Expandable */}
            <div>
              <NavItem
                label="PPE Detection"
                onClick={() => toggleModule("ppe")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("ppe") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {expandedModules.has("ppe") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/ppe" label="Dashboard" />
                  <SubNavItem href="/ppe/reports" label="Reports" />
                  <SubNavItem href="/ppe/violations" label="Violations" />
                  <SubNavItem href="/ppe/settings" label="Settings" />
                </div>
              )}
            </div>

            {/* Utility Reader Module - Expandable */}
            <div>
              <NavItem
                label="Utility Reader"
                onClick={() => toggleModule("utility")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("utility") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {expandedModules.has("utility") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/utility" label="Dashboard" />
                  <SubNavItem href="/utility/reports" label="Reports" />
                  <SubNavItem href="/utility/events-alerts" label="Events & Alerts" />
                  <SubNavItem href="/utility/settings" label="Settings" />
                </div>
              )}
            </div>

            {/* People Detection Module - Expandable */}
            <div>
              <NavItem
                label="People Detection"
                onClick={() => toggleModule("people")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("people") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {expandedModules.has("people") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/people" label="Dashboard" />
                  <SubNavItem href="/people/reports" label="Reports" />
                  <SubNavItem href="/people/events-alerts" label="Events & Alerts" />
                  <SubNavItem href="/people/settings" label="Settings" />
                </div>
              )}
            </div>

            {/* Fire / Smoke Detection Module - Expandable */}
            <div>
              <NavItem
                label="Fire / Smoke"
                onClick={() => toggleModule("fire")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("fire") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {expandedModules.has("fire") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/fire" label="Dashboard" />
                  <SubNavItem href="/fire/reports" label="Reports" />
                  <SubNavItem href="/fire/events" label="Events & Alerts" />
                  <SubNavItem href="/fire/settings" label="Settings" />
                </div>
              )}
            </div>
          </nav>

          {/* Configuration Section */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Configuration</div>
            
            {/* Configuration Module - Expandable */}
            <div>
              <NavItem
                label="Configuration"
                onClick={() => toggleModule("configuration")}
              >
                <svg
                  className={`h-4 w-4 transition-transform ${
                    expandedModules.has("configuration") ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavItem>
              {/* Configuration sub-navigation items */}
              {expandedModules.has("configuration") && (
                <div className="ml-4 mt-1 space-y-1">
                  <SubNavItem href="/configuration/input-streams" label="Input Streams" />
                  <SubNavItem href="/configuration/audio-streams" label="Audio Streams" />
                  <SubNavItem href="/configuration/routing" label="Routing" />
                  <SubNavItem href="/configuration/schedule" label="Schedule" />
                  <SubNavItem href="/configuration/user-management" label="User Management" />
                  <SubNavItem href="/configuration/notifications" label="Notifications" />
                  <SubNavItem href="/configuration/zones" label="Zones" />
                </div>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between mt-2 px-3 py-2">
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full ${
                  isDarkMode ? 'bg-green-600' : 'bg-zinc-200'
                }`}
              >
                <span
                  className={`absolute left-1 top-1 inline-block w-4 h-4 transition transform duration-200 ease-in-out bg-white rounded-full shadow ${
                    isDarkMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-white/10">
            <div className="relative" ref={userMenuRef}>
              {/* User Profile Button */}
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 w-full mb-3 text-left hover:bg-zinc-50 dark:hover:bg-white/5 rounded-md p-2 -m-2 transition-colors"
              >
                {/* User Avatar */}
                <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-900 truncate dark:text-zinc-100">Admin User</div>
                  <div className="text-xs text-zinc-500 truncate dark:text-zinc-400">admin@company.com</div>
                </div>
                {/* Dropdown Arrow */}
                <svg
                  className={`h-4 w-4 text-zinc-500 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-950 dark:ring-white/10">
                  <div className="py-1">
                    {/* Profile Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        router.push("/settings/profile");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-white/5"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>
                    
                    {/* Logout Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Clear authentication cookie and redirect to login
                        deleteCookie(AUTH_COOKIE_NAME);
                        closeSocket();
                        router.push("/login");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-white/5"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Original Logout Button */}
            <button
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
              onClick={() => {
                // Clear authentication cookie and redirect to login
                deleteCookie(AUTH_COOKIE_NAME);
                closeSocket();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Header */}
          <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-zinc-950">
            <div>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{pageInfo.title}</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{pageInfo.description}</p>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchResults.length > 0) {
                      const first = searchResults[0];
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      router.push(first.href);
                    }
                  }}
                  className="w-80 rounded-lg border border-zinc-300 bg-zinc-200 px-4 py-2.5 pr-10 text-sm text-zinc-900 placeholder-zinc-600 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
                <div className="absolute right-3 top-3 text-zinc-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {isSearchOpen && searchQuery.trim() ? (
                  <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-950 dark:ring-white/10">
                    {searchResults.length > 0 ? (
                      <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                        {searchResults.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                              router.push(r.href);
                            }}
                            className="flex w-full items-start justify-between gap-4 border-b border-zinc-200 px-4 py-3 text-left last:border-b-0 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                          >
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{r.title}</div>
                              {r.description ? (
                                <div className="mt-0.5 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400">{r.description}</div>
                              ) : null}
                            </div>
                            {r.section ? (
                              <div className="shrink-0 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                                {r.section}
                              </div>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">No results found</div>
                    )}
                  </div>
                ) : null}
              </div>
              
              {/* Notification Bell */}
              <div className="relative" ref={notificationsRef}>
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={isNotificationsOpen}
                  className="relative rounded-lg p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 ? (
                    <span className="absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  ) : null}
                </button>

                {isNotificationsOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-950 dark:ring-white/10"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-white/10">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</div>
                      <button
                        type="button"
                        onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
                        className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                      {notifications.map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                          className="flex w-full items-start gap-3 border-b border-zinc-200 px-4 py-3 text-left last:border-b-0 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                        >
                          <span className={`mt-1 h-2 w-2 rounded-full ${n.unread ? "bg-green-500" : "bg-zinc-300 dark:bg-white/20"}`} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{n.title}</div>
                              <div className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">{n.time}</div>
                            </div>
                            <div className="mt-0.5 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{n.message}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              
              {/* Settings Button */}
              <button
                type="button"
                onClick={() => router.push("/settings")}
                className="rounded-lg p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
