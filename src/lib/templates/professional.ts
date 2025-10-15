import type { Template } from '../types';

export const professionalTemplate: Template = {
  id: 'professional',
  name: 'Professional',
  isPremium: false,
  markdown: `
# {{name}}
> {{email}} | {{phone}} | {{website}}

***

## Experience
{{#experience}}
**{{title}} at {{company}}**
*{{startDate}} – {{endDate}}*

* {{description}}
{{/experience}}

***

## Projects

**Brand Revival Campaign**
* Developed and executed a campaign for a clothing brand that resulted in a 50% increase in website traffic and a 30% in online sales.
* Managed influencer partnerships and social media strategy to connect with the target audience.

***

## Skills
> {{skills}}

***

## Education
{{#education}}
**{{degree}}**
{{institution}}, {{startDate}} – {{endDate}}
{{/education}}
`,
};
