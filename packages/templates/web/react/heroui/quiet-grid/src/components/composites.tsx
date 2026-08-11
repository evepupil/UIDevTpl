import { Tabs } from "@heroui/react";
import { ArrowUpRight, Check, CircleAlert, CircleCheck, MoreHorizontal, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { QuietAvatar, QuietBadge, QuietIconButton } from "./atoms";

export interface TaskItem {
  id: string;
  title: string;
  meta: string;
  owner: string;
  initials: string;
  date: string;
  priority: "high" | "normal" | "done";
  completed?: boolean;
}

export function SectionHeading({ eyebrow, title, detail, action }: { eyebrow?: string; title: string; detail?: string; action?: React.ReactNode }) {
  return (
    <div className="qg-section-heading">
      <div>
        {eyebrow ? <span className="qg-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {detail ? <span className="qg-section-detail">{detail}</span> : null}
      </div>
      {action}
    </div>
  );
}

export function MetricStrip() {
  const metrics = [
    { label: "开放任务", value: "08", note: "3 个今天到期", icon: TrendingUp, tone: "sage", bars: [34, 48, 43, 62, 58, 74, 82] },
    { label: "进行中的 Agent", value: "06", note: "1 个等待审核", tone: "coral", bars: [58, 52, 63, 56, 72, 69, 78] },
    { label: "门禁通过率", value: "98.6%", note: "最近 30 次验证", tone: "ink", bars: [76, 72, 80, 78, 88, 84, 92] },
    { label: "交付完成度", value: "84%", note: "本周提升 12%", tone: "amber", bars: [28, 36, 42, 54, 51, 67, 84] }
  ];

  return (
    <dl className="qg-metric-strip">
      {metrics.map(({ icon: Icon, label, note, value, tone, bars }) => (
        <div className={`qg-metric qg-metric--${tone}`} key={label}>
          <div className="qg-metric-head"><dt>{label}</dt><span className="qg-metric-dot" /></div>
          <div className="qg-metric-value-row"><dd>{value}</dd><div className="qg-spark" aria-hidden="true">{bars.map((height, index) => <i key={`${label}-${index}`} style={{ height: `${height}%` }} />)}</div></div>
          <span className="qg-metric-note">{Icon ? <Icon size={13} aria-hidden="true" /> : null}{note}</span>
        </div>
      ))}
    </dl>
  );
}

function TaskRow({ item, index, onToggle }: { item: TaskItem; index: number; onToggle: (id: string) => void }) {
  return (
    <article className={`qg-task-row${item.completed ? " is-complete" : ""}`}>
      <button className="qg-check-button" type="button" onClick={() => onToggle(item.id)} aria-label={item.completed ? `标记 ${item.title} 未完成` : `标记 ${item.title} 完成`}>
        <Check size={15} strokeWidth={2} aria-hidden="true" />
      </button>
      <div className="qg-task-copy">
        <div><span className="qg-task-number">0{index + 1}</span><strong>{item.title}</strong></div>
        <span>{item.meta}</span>
      </div>
      <div className="qg-task-owner">
        <QuietAvatar initials={item.initials} name={item.owner} tone={item.priority === "high" ? "coral" : "sage"} />
        <span>{item.date}</span>
      </div>
      <QuietBadge tone={item.priority === "high" ? "danger" : item.priority === "done" ? "success" : "neutral"}>
        {item.priority === "high" ? "HIGH" : item.priority === "done" ? "DONE" : "NORMAL"}
      </QuietBadge>
      <QuietIconButton icon={MoreHorizontal} label={`${item.title} 更多操作`} />
    </article>
  );
}

export function TaskQueue({ items }: { items: TaskItem[] }) {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState(items);
  const visibleTasks = useMemo(() => {
    if (filter === "today") return tasks.filter((task) => task.date === "Today");
    if (filter === "done") return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  return (
    <section className="qg-panel qg-task-panel">
      <SectionHeading eyebrow="ACTIVE WORK" title="任务队列" detail={`${visibleTasks.length} 个开放任务`} action={<span className="qg-section-total">本周完成 24</span>} />
      <Tabs.Root className="qg-task-tabs" selectedKey={filter} onSelectionChange={(key) => setFilter(String(key))} variant="secondary" aria-label="任务筛选">
        <Tabs.List>
          <Tabs.Tab id="all">全部</Tabs.Tab>
          <Tabs.Tab id="today">今天</Tabs.Tab>
          <Tabs.Tab id="done">已完成</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
      <div className="qg-task-list">
        {visibleTasks.map((item, index) => <TaskRow index={index} item={item} key={item.id} onToggle={(id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))} />)}
      </div>
      <button className="qg-list-footer" type="button">
        查看全部任务 <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </section>
  );
}

export function ActivityRail() {
  const activities = [
    { icon: CircleCheck, tone: "green", title: "Preview 已部署", detail: "main · 66f0108", time: "12m" },
    { icon: CircleAlert, tone: "coral", title: "新增 3 条设计批注", detail: "模板详情页", time: "48m" },
    { icon: Check, tone: "ink", title: "Manifest 已锁定", detail: "M1 / Release", time: "2h" }
  ];

  return (
    <aside className="qg-panel qg-activity-panel">
      <SectionHeading eyebrow="PROJECT PULSE" title="项目脉搏" detail="最近 24 小时" action={<QuietIconButton icon={MoreHorizontal} label="项目脉搏设置" />} />
      <div className="qg-project-image">
        <img src="/assets/quiet-grid-workspace.jpg" alt="明亮的现代工作空间" />
        <span>UIDevTpl / M1</span><b>42%</b>
      </div>
      <div className="qg-project-caption"><div><span>ACTIVE STREAM</span><strong>UIDevTpl Platform</strong><small>4 collaborators · 2 agents</small></div><QuietBadge tone="success">ON TRACK</QuietBadge></div>
      <div className="qg-progress-block">
        <div><span>下一个节点</span><strong>Preview review</strong></div>
        <div className="qg-progress-track"><span style={{ width: "42%" }} /></div>
        <div className="qg-progress-meta"><span>里程碑进度</span><time>18 AUG</time></div>
      </div>
      <ul className="qg-activity-list">
        {activities.map(({ detail, icon: Icon, time, title, tone }) => (
          <li key={title}>
            <span className={`qg-activity-icon qg-activity-icon--${tone}`}><Icon size={14} aria-hidden="true" /></span>
            <div><strong>{title}</strong><span>{detail}</span></div>
            <time>{time}</time>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function QuietState({ kind, title, detail }: { kind: "empty" | "error" | "loading"; title: string; detail: string }) {
  if (kind === "loading") {
    return <div className="qg-state qg-state--loading" aria-label="加载中"><span /><span /><span /></div>;
  }

  return (
    <div className={`qg-state qg-state--${kind}`}>
      {kind === "error" ? <CircleAlert size={22} aria-hidden="true" /> : <CircleCheck size={22} aria-hidden="true" />}
      <strong>{title}</strong>
      <span>{detail}</span>
    </div>
  );
}
