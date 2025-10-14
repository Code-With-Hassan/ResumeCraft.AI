
import type { Template } from './types';

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Modern',
    isPremium: false,
    markdown: `
# {{name}}
{{email}} • {{phone}} • {{website}}

---

## Experience
{{#experience}}
### **{{title}}** | {{company}}
*{{startDate}} – {{endDate}}*

- {{description}}
{{/experience}}

## Education
{{#education}}
### **{{degree}}** | {{institution}}
*{{startDate}} – {{endDate}}*

- {{details}}
{{/education}}

## Skills
- {{skills}}
    `,
  },
  {
    id: 'bold-accent',
    name: 'Bold Accent',
    isPremium: true,
    markdown: `
# **{{name}}**
> {{email}} • {{phone}} • {{website}}

---

### PROFESSIONAL EXPERIENCE
{{#experience}}
**{{title}}** at *{{company}}*
*{{startDate}} - {{endDate}}*
- {{description}}
{{/experience}}

<br/>

### EDUCATION
{{#education}}
**{{degree}}** at *{{institution}}*
*{{startDate}} - {{endDate}}*
- {{details}}
{{/education}}

<br/>

### KEY SKILLS
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
### **Professional Summary**
> A brief summary of your career goals and qualifications. This section can be edited in the markdown template.

---
### **Work Experience**
{{#experience}}
**{{title}}**, {{company}}
*{{startDate}} - {{endDate}}*
- {{description}}
---
{{/experience}}

### **Education**
{{#education}}
**{{institution}}**, *{{degree}}*
*{{startDate}} - {{endDate}}*
- {{details}}
---
{{/education}}

### **Skills**
- {{skills}}
    `
  },
  {
    id: 'creative',
    name: 'Creative',
    isPremium: true,
    markdown: `
# {{name}}

> A creative and driven professional with a passion for innovation. This section can be edited in the markdown template.

### **Contact**
- **Email:** {{email}}
- **Phone:** {{phone}}
- **Portfolio:** {{website}}

---

### **Experience**
{{#experience}}
- **{{title}}** at *{{company}}* ({{startDate}} - {{endDate}})
  - {{description}}
{{/experience}}

---

### **Education**
{{#education}}
- **{{degree}}**, *{{institution}}* ({{startDate}} - {{endDate}})
  - {{details}}
{{/education}}

---

### **Skills**
> {{skills}}
    `
  }
];
