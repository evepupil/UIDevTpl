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
    { label: "本周完成", value: "24", note: "较上周 18%", icon: TrendingUp },
    { label: "进行中的 Agent", value: "06", note: "覆盖 4 个项目" },
    { label: "门禁通过率", value: "98.6%", note: "最近 30 次验证" }
  ];

  return (
    <dl className="qg-metric-strip">
      {metrics.map(({ icon: Icon, label, note, value }) => (
        <div className="qg-metric" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
          <span>{Icon ? <Icon size={13} aria-hidden="true" /> : null}{note}</span>
        </div>
      ))}
    </dl>
  );
}

function TaskRow({ item, onToggle }: { item: TaskItem; onToggle: (id: string) => void }) {
  return (
    <article className={`qg-task-row${item.completed ? " is-complete" : ""}`}>
      <button className="qg-check-button" type="button" onClick={() => onToggle(item.id)} aria-label={item.completed ? `标记 ${item.title} 未完成` : `标记 ${item.title} 完成`}>
        <Check size={15} strokeWidth={2} aria-hidden="true" />
      </button>
      <div className="qg-task-copy">
        <strong>{item.title}</strong>
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
      <SectionHeading title="任务队列" detail={`${visibleTasks.length} 个开放任务`} />
      <Tabs.Root className="qg-task-tabs" selectedKey={filter} onSelectionChange={(key) => setFilter(String(key))} variant="secondary" aria-label="任务筛选">
        <Tabs.List>
          <Tabs.Tab id="all">全部</Tabs.Tab>
          <Tabs.Tab id="today">今天</Tabs.Tab>
          <Tabs.Tab id="done">已完成</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>
      <div className="qg-task-list">
        {visibleTasks.map((item) => <TaskRow item={item} key={item.id} onToggle={(id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))} />)}
      </div>
      <button className="qg-list-footer" type="button">
        查看全部任务 <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </section>
  );
}

export function ActivityRail() {
  const activities = [
    { icon: CircleCheck, tone: "green", title: "生产构建通过", detail: "main · 5b9dd48", time: "12m" },
    { icon: CircleAlert, tone: "coral", title: "新增 3 条设计批注", detail: "模板详情页", time: "48m" },
    { icon: Check, tone: "ink", title: "需求基线已提交", detail: "M0 / Documentation", time: "2h" }
  ];

  return (
    <aside className="qg-panel qg-activity-panel">
      <SectionHeading title="项目脉搏" detail="最近 24 小时" action={<QuietIconButton icon={MoreHorizontal} label="项目脉搏设置" />} />
      <div className="qg-project-image">
        <img src="/assets/quiet-grid-workspace.jpg" alt="明亮的现代工作空间" />
        <span>UIDevTpl / M1</span>
      </div>
      <div className="qg-progress-block">
        <div><span>里程碑进度</span><strong>42%</strong></div>
        <div className="qg-progress-track"><span style={{ width: "42%" }} /></div>
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
