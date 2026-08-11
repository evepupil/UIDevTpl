import { Bell, Blocks, CircleHelp, FolderKanban, LayoutDashboard, Library, Menu, Play, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Kbd, QuietAvatar, QuietIconButton } from "../components/atoms";

const navigation = [
  { id: "overview", label: "概览", icon: LayoutDashboard, shortcut: "G D" },
  { id: "projects", label: "项目", icon: FolderKanban, count: "8" },
  { id: "runs", label: "运行记录", icon: Play },
  { id: "library", label: "知识库", icon: Library }
];

export function AppShell({ children, activeNavigation = "overview" }: { children: ReactNode; activeNavigation?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="qg-app-shell">
      {mobileOpen ? <button className="qg-mobile-scrim" type="button" aria-label="关闭导航" onClick={() => setMobileOpen(false)} /> : null}
      <aside className={`qg-sidebar${mobileOpen ? " is-mobile-open" : ""}`}>
        <div className="qg-sidebar-top">
          <a className="qg-brand" href="#top" aria-label="Atelier 首页">
            <span className="qg-brand-mark"><Blocks size={17} strokeWidth={1.7} aria-hidden="true" /></span>
            <span><strong>ATELIER</strong><small>AI PROJECTS</small></span>
          </a>
          <button className="qg-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="关闭导航"><X size={18} /></button>
        </div>
        <div className="qg-nav-label">Workspace</div>
        <nav className="qg-nav" aria-label="工作台导航">
          {navigation.map(({ count, icon: Icon, id, label, shortcut }) => (
            <button className={id === activeNavigation ? "is-active" : ""} key={id} type="button">
              <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
              {shortcut ? <Kbd>{shortcut}</Kbd> : null}
              {count ? <em>{count}</em> : null}
            </button>
          ))}
        </nav>
        <div className="qg-sidebar-section">
          <span>Projects</span>
          <button type="button"><i className="qg-project-dot qg-project-dot--green" /><span>UIDevTpl</span><em>active</em></button>
          <button type="button"><i className="qg-project-dot qg-project-dot--coral" /><span>Cloud Notes</span><em>draft</em></button>
        </div>
        <div className="qg-sidebar-sync"><span><i />同步正常</span><time>2 分钟前</time></div>
        <div className="qg-profile">
          <QuietAvatar initials="ZT" name="Zhouw Tao" />
          <span><strong>Zhouw Tao</strong><small>Product builder</small></span>
          <button type="button" aria-label="账户菜单"><span>···</span></button>
        </div>
      </aside>
      <section className="qg-app-main" id="top">
        <header className="qg-topbar">
          <button className="qg-mobile-menu" type="button" onClick={() => setMobileOpen(true)} aria-label="打开导航"><Menu size={19} /></button>
          <div className="qg-breadcrumb"><span>Projects</span><span aria-hidden="true">/</span><strong>UIDevTpl</strong></div>
          <label className="qg-command-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="搜索任务" aria-label="搜索任务" />
            <Kbd>⌘ K</Kbd>
          </label>
          <div className="qg-topbar-status"><Sparkles size={13} aria-hidden="true" /><span>All systems nominal</span></div>
          <div className="qg-topbar-actions">
            <QuietIconButton icon={Bell} label="通知" className="qg-has-notice" />
            <QuietIconButton icon={CircleHelp} label="帮助" />
          </div>
        </header>
        <main className="qg-page">{children}</main>
      </section>
    </div>
  );
}
