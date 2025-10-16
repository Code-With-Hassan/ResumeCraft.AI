
import type { Template } from '../types';

export const corporateTemplate: Template = {
  id: 'corporate',
  name: 'Corporate',
  isPremium: false,
  style: 'prose-h2:text-2xl prose-h2:text-center prose-h3:font-bold prose-h3:uppercase prose-h3:tracking-wider prose-h3:text-base prose-hr:my-3',
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
