import type { Template } from '../types';

export const wayneTemplate: Template = {
  id: 'wayne',
  name: 'Wayne',
  isPremium: true,
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
