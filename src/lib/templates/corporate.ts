import type { Template } from '../types';

export const corporateTemplate: Template = {
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
    `,
};
