import * as React from "react"

import { Check, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
      <Card aria-labelledby="project-settings-title">
        <CardHeader>
          <CardTitle id="project-settings-title">Project</CardTitle>
          <CardAction>
            {saved ? (
              <span className="blackline-saved">
                <Check aria-hidden="true" />
                Saved
              </span>
            ) : null}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="blackline-form-grid">
            <div className="blackline-field">
              <Label htmlFor="project-name">Project name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
              />
            </div>
            <div className="blackline-field">
              <Label htmlFor="default-environment">Default environment</Label>
              <Select
                value={environment}
                onValueChange={(value) => value && setEnvironment(value)}
              >
                <SelectTrigger
                  id="default-environment"
                  aria-label="Default environment"
                >
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
        </CardContent>
        <CardFooter className="justify-start">
          <Button onClick={save}>
            <Save aria-hidden="true" />
            Save changes
          </Button>
        </CardFooter>
      </Card>
      <Card aria-labelledby="team-settings-title">
        <CardHeader>
          <CardTitle id="team-settings-title">Team access</CardTitle>
          <CardAction>
            <Button variant="outline" size="sm">
              Invite member
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">shadcn</TableCell>
                <TableCell>m@example.com</TableCell>
                <TableCell className="text-muted-foreground">Owner</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lin Chen</TableCell>
                <TableCell>lin@example.com</TableCell>
                <TableCell className="text-muted-foreground">Member</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
