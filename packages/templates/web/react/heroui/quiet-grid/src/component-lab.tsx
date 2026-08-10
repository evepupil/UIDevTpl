"use client";

import { Checkbox, Skeleton, Switch, Tabs } from "@heroui/react";
import { Check, CircleAlert, Plus } from "lucide-react";
import { QuietAvatar, QuietBadge, QuietButton, QuietField, QuietIconButton } from "./components/atoms";
import { QuietState as StatePanel } from "./components/composites";

export function QuietGridComponentLab() {
  return (
    <main className="qg-lab-shell">
      <header className="qg-lab-header">
        <div><span className="qg-eyebrow">Quiet Grid / Component Lab</span><h1>组件实验室</h1><p>验证组件 API、状态和键盘行为，确保迁移后的页面仍然保持同一套视觉秩序。</p></div>
        <QuietButton variant="secondary"><Plus size={15} aria-hidden="true" />添加状态</QuietButton>
      </header>
      <section className="qg-lab-section">
        <div className="qg-lab-section-heading"><span>01</span><div><h2>操作与展示</h2><p>Primary / Secondary / Quiet / Disabled</p></div></div>
        <div className="qg-lab-demo qg-lab-demo--actions"><QuietButton>主要操作</QuietButton><QuietButton variant="secondary">次要操作</QuietButton><QuietButton variant="tertiary">轻量操作</QuietButton><QuietButton isDisabled>不可用</QuietButton><QuietIconButton icon={Check} label="确认" /></div>
        <div className="qg-lab-demo qg-lab-demo--badges"><QuietBadge>Neutral</QuietBadge><QuietBadge tone="success">Success</QuietBadge><QuietBadge tone="warning">Warning</QuietBadge><QuietBadge tone="danger">Error</QuietBadge><QuietAvatar initials="ZT" name="Zhouw Tao" /></div>
      </section>
      <section className="qg-lab-section">
        <div className="qg-lab-section-heading"><span>02</span><div><h2>输入与设置</h2><p>Default / Filled / Invalid / Toggle</p></div></div>
        <div className="qg-lab-form-grid"><QuietField label="项目名称" defaultValue="Knowledge Atlas" /><QuietField label="模板版本" defaultValue="latest" invalid errorMessage="请输入固定语义版本" /><label className="qg-lab-toggle"><Switch defaultSelected><Switch.Control><Switch.Thumb /></Switch.Control><Switch.Content>迁移后运行门禁</Switch.Content></Switch></label><Checkbox defaultSelected><Checkbox.Control><Checkbox.Indicator><Check size={12} /></Checkbox.Indicator></Checkbox.Control><Checkbox.Content>保留原始参考源码</Checkbox.Content></Checkbox></div>
      </section>
      <section className="qg-lab-section">
        <div className="qg-lab-section-heading"><span>03</span><div><h2>导航和数据状态</h2><p>Tabs / Empty / Error / Loading</p></div></div>
        <Tabs.Root className="qg-lab-tabs" defaultSelectedKey="empty" aria-label="状态样例">
          <Tabs.List><Tabs.Tab id="empty">Empty</Tabs.Tab><Tabs.Tab id="error">Error</Tabs.Tab><Tabs.Tab id="loading">Loading</Tabs.Tab></Tabs.List>
          <Tabs.Panel id="empty"><StatePanel kind="empty" title="暂无任务" detail="创建第一项迁移任务后会显示在这里。" /></Tabs.Panel>
          <Tabs.Panel id="error"><StatePanel kind="error" title="校验失败" detail="模板包的 SHA-256 与发布记录不一致。" /></Tabs.Panel>
          <Tabs.Panel id="loading"><div className="qg-lab-skeleton"><Skeleton /><Skeleton /><Skeleton /></div></Tabs.Panel>
        </Tabs.Root>
      </section>
    </main>
  );
}
