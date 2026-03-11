export type GlobalSearchItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  keywords?: string[];
  section?: string;
};

const ITEMS: GlobalSearchItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "System overview and real-time monitoring",
    href: "/dashboard",
    keywords: ["home", "overview", "monitoring"],
    section: "General",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage profile, password and theme",
    href: "/settings",
    keywords: ["profile", "password", "theme"],
    section: "General",
  },
  {
    id: "settings-profile",
    title: "Profile Settings",
    description: "Update name and email",
    href: "/settings/profile",
    keywords: ["user", "account", "email"],
    section: "Settings",
  },
  {
    id: "settings-password",
    title: "Password Settings",
    description: "Change your password",
    href: "/settings/password",
    keywords: ["security", "reset"],
    section: "Settings",
  },
  {
    id: "settings-theme",
    title: "Theme Settings",
    description: "Light/Dark mode",
    href: "/settings/theme",
    keywords: ["dark", "light", "mode"],
    section: "Settings",
  },

  {
    id: "configuration-input-streams",
    title: "Input Streams",
    description: "Configure camera input streams",
    href: "/configuration/input-streams",
    keywords: ["rtsp", "camera"],
    section: "Configuration",
  },
  {
    id: "configuration-audio-streams",
    title: "Audio Streams",
    description: "Configure audio stream settings",
    href: "/configuration/audio-streams",
    keywords: ["mic", "sound"],
    section: "Configuration",
  },
  {
    id: "configuration-routing",
    title: "Routing",
    description: "Stream routing to detection modules",
    href: "/configuration/routing",
    keywords: ["pipeline", "streams"],
    section: "Configuration",
  },
  {
    id: "configuration-notifications",
    title: "Notification Settings",
    description: "Manage alerts and notification channels",
    href: "/configuration/notifications",
    keywords: ["email", "sms", "push"],
    section: "Configuration",
  },
  {
    id: "configuration-schedule",
    title: "Schedule",
    description: "Time-based rules and scheduling",
    href: "/configuration/schedule",
    keywords: ["time", "rules"],
    section: "Configuration",
  },
  {
    id: "configuration-user-management",
    title: "User Management",
    description: "Manage users and roles",
    href: "/configuration/user-management",
    keywords: ["rbac", "roles", "users"],
    section: "Configuration",
  },
  {
    id: "configuration-zones",
    title: "Zones",
    description: "Zone based monitoring",
    href: "/configuration/zones",
    keywords: ["areas", "maps"],
    section: "Configuration",
  },

  {
    id: "in-out",
    title: "In/Out Detection",
    description: "Vehicle tracking and ANPR",
    href: "/in-out",
    keywords: ["anpr", "vehicles"],
    section: "Modules",
  },
  {
    id: "parking",
    title: "Parking Detection",
    description: "Parking occupancy and zones",
    href: "/parking",
    keywords: ["spaces", "occupancy"],
    section: "Modules",
  },
  {
    id: "ppe",
    title: "PPE Detection",
    description: "Helmet, vest and safety compliance",
    href: "/ppe",
    keywords: ["helmet", "vest", "safety"],
    section: "Modules",
  },
  {
    id: "utility",
    title: "Utility Reader",
    description: "Automated meter reading",
    href: "/utility",
    keywords: ["meter", "electric", "water", "gas"],
    section: "Modules",
  },
  {
    id: "people",
    title: "People Detection",
    description: "Counting and capacity monitoring",
    href: "/people",
    keywords: ["count", "capacity"],
    section: "Modules",
  },
  {
    id: "fire",
    title: "Fire/Smoke Detection",
    description: "Fire and smoke alerts",
    href: "/fire",
    keywords: ["smoke", "emergency"],
    section: "Modules",
  },
];

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function searchGlobal(query: string, limit = 8): GlobalSearchItem[] {
  const q = normalize(query);
  if (!q) return [];

  const scored = ITEMS.map((item) => {
    const title = normalize(item.title);
    const description = normalize(item.description ?? "");
    const keywords = (item.keywords ?? []).map(normalize);

    let score = 0;

    if (title === q) score += 100;
    if (title.startsWith(q)) score += 60;
    if (title.includes(q)) score += 40;
    if (keywords.some((k) => k === q)) score += 45;
    if (keywords.some((k) => k.startsWith(q))) score += 25;
    if (keywords.some((k) => k.includes(q))) score += 15;
    if (description.includes(q)) score += 10;

    return { item, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const unique: GlobalSearchItem[] = [];
  const seen = new Set<string>();
  for (const s of scored) {
    if (seen.has(s.item.href)) continue;
    unique.push(s.item);
    seen.add(s.item.href);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function getGlobalSearchItems() {
  return ITEMS.slice();
}
