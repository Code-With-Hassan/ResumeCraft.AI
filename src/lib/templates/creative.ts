import type { Template } from '../types';

export const creativeTemplate: Template = {
  id: 'creative',
  name: 'Creative',
  isPremium: true,
  markdown: `
# {{name}}

> A creative and driven professional with a passion for innovation. This section can be edited in the markdown template.

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
