"use client";

import { Modal, Toast, toast } from "@heroui/react";
import { ArrowUpRight, CalendarDays, Plus } from "lucide-react";
import { AppShell } from "../layouts/app-shell";
import { QuietButton, QuietField } from "../components/atoms";
import { ActivityRail, MetricStrip, TaskQueue } from "../components/composites";

const tasks = [
  { id: "design", title: "完成模板平台高保真原型", meta: "UIDevTpl · Product design", owner: "Zhouw Tao", initials: "ZT", date: "Today", priority: "high" as const },
  { id: "mobile", title: "验证移动端预览和筛选", meta: "UIDevTpl · Quality", owner: "Lin Chen", initials: "LC", date: "Today", priority: "normal" as const },
  { id: "manifest", title: "锁定固定版本 Manifest", meta: "Release · Schema", owner: "Agent", initials: "AI", date: "Aug 09", priority: "done" as const, completed: true },
  { id: "assets", title: "整理资产许可证记录", meta: "Quiet Grid · Content", owner: "Mika", initials: "MK", date: "Aug 12", priority: "normal" as const }
];

export function AiProjectWorkspaceShowcase() {
  return (
    <AppShell>
      <div className="qg-page-heading">
        <div className="qg-heading-copy">
          <div className="qg-heading-kicker"><span className="qg-eyebrow">Workspace / 01</span><span className="qg-heading-status"><i />In focus</span></div>
          <h1>让每一次交付，<br /><em>都更接近完成。</em></h1>
          <p>Tuesday, August 10 <span /> 3 个任务即将到期，最近一次验证全部通过。</p>
        </div>
        <div className="qg-heading-actions">
          <div className="qg-heading-note"><span>Today&apos;s focus</span><strong>Design system</strong><small><CalendarDays size={12} aria-hidden="true" /> Review at 16:00</small></div>
          <Modal>
            <Modal.Trigger>
              <QuietButton variant="primary"><Plus size={16} aria-hidden="true" />新建任务</QuietButton>
            </Modal.Trigger>
            <Modal.Backdrop variant="opaque">
              <Modal.Container size="sm">
                <Modal.Dialog>
                  <Modal.Header>
                    <div><span className="qg-eyebrow">New task</span><Modal.Heading>创建迁移任务</Modal.Heading></div>
                    <Modal.CloseTrigger aria-label="关闭"><span aria-hidden="true">×</span></Modal.CloseTrigger>
                  </Modal.Header>
                  <Modal.Body>
                    <QuietField label="任务名称" defaultValue="迁移分析页视觉系统" />
                    <label className="qg-field"><span className="qg-field-label">优先级</span><select className="qg-select" defaultValue="normal"><option value="normal">普通</option><option value="high">高</option></select></label>
                  </Modal.Body>
                  <Modal.Footer>
                    <Modal.CloseTrigger className="qg-modal-secondary">取消</Modal.CloseTrigger>
                    <Modal.CloseTrigger className="qg-modal-primary" onPress={() => toast.success("迁移任务已创建", { description: "它已加入你的任务队列。" })}>创建任务</Modal.CloseTrigger>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>
      </div>
      <MetricStrip />
      <div className="qg-work-grid">
        <TaskQueue items={tasks} />
        <ActivityRail />
      </div>
      <div className="qg-page-footer-note"><span>Quiet Grid / Application skeleton</span><button type="button" onClick={() => toast.info("固定版本预览已重置")}>重置演示 <ArrowUpRight size={14} aria-hidden="true" /></button></div>
      <Toast.Provider placement="bottom end" />
    </AppShell>
  );
}
