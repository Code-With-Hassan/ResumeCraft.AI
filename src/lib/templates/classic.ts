import type { Template } from '../types';

export const classicTemplate: Template = {
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
};
