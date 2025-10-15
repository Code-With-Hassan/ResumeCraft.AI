
import type { Template } from '../types';

export const wayneTemplate: Template = {
  id: 'wayne',
  name: 'Wayne',
  isPremium: true,
  style: 'prose-h1:text-3xl prose-h2:uppercase prose-h2:font-bold prose-h2:tracking-widest prose-h2:text-sm prose-h2:border-b prose-h2:pb-1 prose-h2:mt-4 prose-hr:hidden',
  markdown: `
# {{name}}
{{website}} | {{email}} | {{phone}}

---

## Experience

{{#experience}}
**{{title}}** at *{{company}}*
*{{startDate}} - {{endDate}}*

- {{description}}
{{/experience}}

## Education

{{#education}}
**{{degree}}**
*{{institution}} | {{startDate}} - {{endDate}}*

- {{details}}
{{/education}}

## Skills

**Skills:** {{skills}}

`,
};
