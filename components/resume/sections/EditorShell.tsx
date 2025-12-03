"use client"

import { Card, Tabs } from "antd"
import { BasicSection } from "./BasicSection"
import { ExperienceSection } from "./ExperienceSection"
import { SkillsSection } from "./SkillsSection"
import { ProjectsSection } from "./ProjectsSection"
import { EducationSection } from "./EducationSection"

const { TabPane } = Tabs

export function EditorShell() {
  return (
    <Card className="h-full rounded-2xl border-slate-200 shadow-sm">
      <Tabs defaultActiveKey="basic" className="editor-tabs">
        <TabPane tab="Основное" key="basic">
          <BasicSection />
        </TabPane>
        <TabPane tab="Опыт" key="experience">
          <ExperienceSection />
        </TabPane>
        <TabPane tab="Навыки" key="skills">
          <SkillsSection />
        </TabPane>
        <TabPane tab="Проекты" key="projects">
          <ProjectsSection />
        </TabPane>
        <TabPane tab="Образование" key="education">
          <EducationSection />
        </TabPane>
      </Tabs>
    </Card>
  )
}
