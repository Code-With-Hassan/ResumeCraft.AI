
import type { Template } from '../types';

export const professionalTemplate: Template = {
  id: 'professional',
  name: 'Professional',
  isPremium: false,
  style: 'prose-h1:text-center prose-h2:text-lg prose-h2:uppercase prose-h2:tracking-widest prose-h2:font-semibold prose-h2:mt-4 prose-hr:my-2 prose-strong:font-semibold prose-blockquote:text-center prose-p:my-0',
  markdown: `
# {{name}}
> {{email}} | {{phone}} | {{website}}

***

## Summary
> {{summary}}

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
