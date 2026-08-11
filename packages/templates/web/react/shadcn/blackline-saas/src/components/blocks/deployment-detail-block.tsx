import * as React from "react"

import { ArrowLeft, Check, Copy, ExternalLink, GitBranch, Globe2, MoreHorizontal, RotateCcw, Server } from "lucide-react"

import { Button } from "@/components/ui/button"

import { deploymentSteps, deployments, projectSummary, type PlatformPage } from "../../lib/platform-data"
import { ActivityTimeline, PageHeader, StatusBadge } from "../patterns"

export function DeploymentDetailBlock({
  onNavigate,
  onStatus,
}: {
  onNavigate?: (page: PlatformPage) => void
  onStatus?: (message: string) => void
}) {
  const deployment = deployments[0]
  const [copied, setCopied] = React.useState(false)

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(`https://${deployment.url}`)
      setCopied(true)
      onStatus?.("URL copied")
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      onStatus?.("Copy unavailable")
    }
  }

  return (
    <>
      <PageHeader
        title={deployment.id}
        meta={<StatusBadge status={deployment.status} />}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("deployments")}>
              <ArrowLeft aria-hidden="true" />
              Deployments
            </Button>
            <Button size="sm" onClick={() => onStatus?.("Redeploy started")}>
              <RotateCcw aria-hidden="true" />
              Redeploy
            </Button>
          </>
        }
      />

      <section className="blackline-detail-hero" aria-labelledby="deployment-title">
        <div className="blackline-detail-hero__main">
          <div className="blackline-inline-icon"><GitBranch aria-hidden="true" /><strong>{deployment.branch}</strong><code>{deployment.commit}</code></div>
          <h2 id="deployment-title">{deployment.message}</h2>
          <span className="blackline-muted">{deployment.createdAt} · {deployment.duration}</span>
        </div>
        <div className="blackline-detail-hero__actions">
          <Button variant="outline" size="sm" onClick={copyUrl}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy URL"}
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="More deployment actions" onClick={() => onStatus?.("Deployment actions opened")}>
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </div>
      </section>

      <div className="blackline-detail-grid">
        <section className="blackline-section" aria-labelledby="build-title">
          <div className="blackline-section__header">
            <h2 id="build-title">Build</h2>
            <span className="blackline-muted">42s</span>
          </div>
          <ActivityTimeline events={deploymentSteps} />
          <div className="blackline-log" aria-label="Build log">
            <div><span className="blackline-log__time">10:42:08</span><span className="blackline-log__ok">info</span>Preparing build environment</div>
            <div><span className="blackline-log__time">10:42:12</span><span className="blackline-log__ok">info</span>Installing dependencies</div>
            <div><span className="blackline-log__time">10:42:31</span><span className="blackline-log__ok">info</span>Building application</div>
            <div><span className="blackline-log__time">10:42:50</span><span className="blackline-log__ok">done</span>Deployment ready</div>
          </div>
        </section>

        <section className="blackline-section" aria-labelledby="deployment-info-title">
          <div className="blackline-section__header">
            <h2 id="deployment-info-title">Deployment info</h2>
          </div>
          <dl className="blackline-detail-list">
            <div><dt>Project</dt><dd>{projectSummary.name}</dd></div>
            <div><dt>Environment</dt><dd><span className="blackline-inline-icon"><Server aria-hidden="true" />{deployment.environment}</span></dd></div>
            <div><dt>Domain</dt><dd><a href={`https://${deployment.url}`} target="_blank" rel="noreferrer">{deployment.url}<ExternalLink aria-hidden="true" /></a></dd></div>
            <div><dt>Commit</dt><dd><code>{deployment.commit}</code></dd></div>
            <div><dt>Runtime</dt><dd>Node.js 24</dd></div>
            <div><dt>Region</dt><dd><span className="blackline-inline-icon"><Globe2 aria-hidden="true" />Global</span></dd></div>
          </dl>
        </section>
      </div>

      <section className="blackline-section" aria-labelledby="deployment-url-title">
        <div className="blackline-section__header">
          <h2 id="deployment-url-title">Live URL</h2>
        </div>
        <div className="blackline-url-field">
          <code>https://{deployment.url}</code>
          <Button variant="ghost" size="icon-sm" aria-label="Copy deployment URL" onClick={copyUrl}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </Button>
        </div>
      </section>
    </>
  )
}
