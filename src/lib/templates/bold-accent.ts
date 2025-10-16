
import type { Template } from '../types';

export const boldAccentTemplate: Template = {
  id: 'bold-accent',
  name: 'Bold Accent',
  isPremium: true,
  style: 'prose-headings:text-primary prose-headings:font-bold prose-strong:font-bold prose-p:my-1',
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
};
