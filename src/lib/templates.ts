import type { Template } from './types';
import { classicTemplate } from './templates/classic';
import { boldAccentTemplate } from './templates/bold-accent';
import { corporateTemplate } from './templates/corporate';
import { creativeTemplate } from './templates/creative';
import { professionalTemplate } from './templates/professional';

export const templates: Template[] = [
  classicTemplate,
  boldAccentTemplate,
  corporateTemplate,
  creativeTemplate,
  professionalTemplate,
];
