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

export const quietGridFamily = {
  id: "quiet-grid",
  version: "1.0.0",
  name: "Quiet Grid",
  description: "安静、精确、具有编辑感的通用界面系统，适合信息密度较高的工作产品与内容页面。",
  platforms: ["web"],
  runtimes: ["browser"],
  themes: ["light"],
  traits: ["编辑感", "克制", "工具界面", "知识内容"],
  tokens: {
    colors: {
      canvas: "#f4f5f1",
      surface: "#ffffff",
      ink: "#19221e",
      muted: "#6c7771",
      border: "#d8ded8",
      accent: "#567565"
    },
    typography: {
      display: "system-ui",
      body: "system-ui",
      mono: "ui-monospace"
    },
    radii: {
      sm: "4px",
      md: "8px"
    },
    spacing: {
      unit: "4px",
      section: "64px"
    }
  },
  requiredComponents: ["Button", "Input", "Select", "Tabs", "Modal", "Toast", "EmptyState", "Skeleton"],
  pageSkeletons: ["marketing", "application", "content"]
} as const satisfies DesignFamilyContract;
