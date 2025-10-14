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
  {
    id: 'corporate',
    name: 'Corporate',
    isPremium: false,
    markdown: `
## {{name}}
{{email}} | {{phone}} | {{website}}

---
### **PROFESSIONAL SUMMARY**
A brief summary of your career goals and qualifications.

---
### **WORK EXPERIENCE**
{{#experience}}
**{{title}}**, {{company}} ({{startDate}} - {{endDate}})
- {{description}}
{{/experience}}

---
### **EDUCATION**
{{#education}}
**{{institution}}** ({{startDate}} - {{endDate}})
*{{degree}}*
- {{details}}
{{/education}}

---
### **SKILLS**
- {{skills}}
    `
  },
  {
    id: 'creative',
    name: 'Creative',
    isPremium: true,
    markdown: `
# {{name}}

> A creative and driven professional.

### Contact
- Email: {{email}}
- Phone: {{phone}}
- Portfolio: {{website}}

---

### Work Experience
{{#experience}}
- **{{title}}** at *{{company}}* ({{startDate}} - {{endDate}})
  - {{description}}
{{/experience}}

### Education
{{#education}}
- **{{degree}}**, *{{institution}}* ({{startDate}} - {{endDate}})
  - {{details}}
{{/education}}

### Skills
> {{skills}}
    `
  }
];
