
import type { Template } from '../types';

export const classicTemplate: Template = {
  id: 'classic',
  name: 'Classic Modern',
  isPremium: false,
  style: 'prose-h1:tracking-tight prose-h2:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-hr:my-4 prose-ul:mt-2 prose-p:my-0',
  markdown: `
-> # {{name}}
-> {{email}} • {{phone}} • {{website}}

---

## Summary
> {{summary}}

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
