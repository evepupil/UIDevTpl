import * as React from "react"

import { Check, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { PageHeader } from "../patterns"

export function SettingsBlock() {
  const [saved, setSaved] = React.useState(false)
  const [projectName, setProjectName] = React.useState("Atlas")
  const [environment, setEnvironment] = React.useState("Production")

  function save() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  return (
    <>
      <PageHeader title="Settings" />
      <section className="blackline-settings-section" aria-labelledby="project-settings-title">
        <div className="blackline-section__header">
          <h2 id="project-settings-title">Project</h2>
          {saved ? <span className="blackline-saved"><Check aria-hidden="true" />Saved</span> : null}
        </div>
        <div className="blackline-form-grid">
          <div className="blackline-field">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
          </div>
          <div className="blackline-field">
            <Label htmlFor="default-environment">Default environment</Label>
            <Select value={environment} onValueChange={(value) => value && setEnvironment(value)}>
              <SelectTrigger id="default-environment" aria-label="Default environment">
                <SelectValue>{environment}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="blackline-field blackline-field--wide">
            <Label htmlFor="production-domain">Production domain</Label>
            <Input id="production-domain" defaultValue="atlas.example.com" />
          </div>
        </div>
        <div className="blackline-settings-actions">
          <Button onClick={save}>
            <Save aria-hidden="true" />
            Save changes
          </Button>
        </div>
      </section>
      <section className="blackline-settings-section" aria-labelledby="team-settings-title">
        <div className="blackline-section__header">
          <h2 id="team-settings-title">Team access</h2>
          <Button variant="outline" size="sm">Invite member</Button>
        </div>
        <div className="blackline-member-list">
          <div className="blackline-member-row"><strong>shadcn</strong><span>m@example.com</span><span className="blackline-muted">Owner</span></div>
          <div className="blackline-member-row"><strong>Lin Chen</strong><span>lin@example.com</span><span className="blackline-muted">Member</span></div>
        </div>
      </section>
    </>
  )
}
