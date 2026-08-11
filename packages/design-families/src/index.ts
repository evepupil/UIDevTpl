export interface DesignFamilyContract {
  id: string;
  version: string;
  name: string;
  description: string;
  platforms: string[];
  runtimes: string[];
  themes: string[];
  traits: string[];
  tokens: {
    colors: Record<string, string>;
    typography: Record<string, string>;
    radii: Record<string, string>;
    spacing: Record<string, string>;
  };
  requiredComponents: string[];
  pageSkeletons: string[];
}

export const blacklineSaasFamily = {
  id: "blackline-saas",
  version: "1.0.0",
  name: "Blackline SaaS",
  description: "一套以灰、黑、白为主的 SaaS 工作台系统，保留清晰的侧栏导航和紧凑的数据层级。",
  platforms: ["web"],
  runtimes: ["browser"],
  themes: ["light", "dark"],
  traits: ["monochrome", "saas", "workspace", "data-dense"],
  tokens: {
    colors: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0 0)",
      border: "oklch(0.922 0 0)",
      primary: "oklch(0.205 0 0)",
      accent: "oklch(0.97 0 0)"
    },
    typography: {
      display: "Geist Variable",
      body: "Geist Variable",
      mono: "ui-monospace"
    },
    radii: {
      sm: "calc(0.625rem * 0.6)",
      md: "calc(0.625rem * 0.8)",
      lg: "0.625rem"
    },
    spacing: {
      unit: "4px",
      section: "24px"
    }
  },
  requiredComponents: ["Sidebar", "Button", "Input", "Breadcrumb", "DropdownMenu", "Collapsible", "Avatar", "Separator", "Tooltip", "Skeleton"],
  pageSkeletons: ["application", "marketing", "content"]
} as const satisfies DesignFamilyContract;
