import type { Template } from './types';

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Modern',
    isPremium: false,
    markdown: `
# {{name}}
> {{email}} | {{phone}} | {{website}}

## Experience
---
{{#experience}}
### **{{title}}** at {{company}}
*{{startDate}} - {{endDate}}*
- {{description}}
{{/experience}}

## Education
---
{{#education}}
### **{{degree}}**, {{institution}}
*{{startDate}} - {{endDate}}*
- {{details}}
{{/education}}

## Skills
---
- {{skills}}
    `,
  },
  {
    id: 'bold-accent',
    name: 'Bold Accent',
    isPremium: true,
    markdown: `
# **{{name}}**

**Contact:** {{email}} | {{phone}} | {{website}}

---

## PROFESSIONAL EXPERIENCE

{{#experience}}
**{{title}}** | *{{company}}*
{{startDate}} to {{endDate}}

- {{description}}
{{/experience}}

---

## EDUCATION

{{#education}}
**{{degree}}** | *{{institution}}*
{{startDate}} to {{endDate}}

- {{details}}
{{/education}}

---

## KEY SKILLS

- {{skills}}
    `,
  },
];
