import type { ResumeData } from "./types";

export const fillTemplate = (template: string, data: ResumeData): string => {
    let output = template;
    Object.entries(data.personal).forEach(([key, value]) => {
      output = output.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
    });
  
    const processSection = (sectionName: 'experience' | 'education') => {
      const regex = new RegExp(`{{#${sectionName}}}(.*?){{\/${sectionName}}}`, 'gs');
      const match = output.match(regex);
      if (match) {
        const itemTemplate = match[0].replace(`{{#${sectionName}}}`, '').replace(`{{/${sectionName}}}`, '').trim();
        const items = data[sectionName];
        if (Array.isArray(items)) {
          const allItems = items.map(item => {
            let temp = itemTemplate;
            Object.entries(item).forEach(([key, value]) => {
              temp = temp.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
            });
            return temp;
          }).join('\n\n');
          output = output.replace(regex, allItems);
        }
      }
    };
  
    processSection('experience');
    processSection('education');
    
    output = output.replace(/{{skills}}/g, data.skills || '');
    return output;
};
