
import type { Template } from '../types';

export const creativeTemplate: Template = {
  id: 'creative',
  name: 'Creative',
  isPremium: true,
  style: 'prose-h1:text-center prose-h1:text-3xl prose-h3:text-primary prose-h3:font-headline prose-blockquote:not-italic prose-blockquote:text-center prose-blockquote:text-base prose-p:my-0',
  markdown: `
# {{name}}

> {{summary}}

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
    `,
};
