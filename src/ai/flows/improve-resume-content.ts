// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides AI-powered suggestions to improve resume content.
 *
 * - improveResumeContent - A function that suggests improvements to resume content.
 * - ImproveResumeContentInput - The input type for the improveResumeContent function.
 * - ImproveResumeContentOutput - The return type for the improveResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResumeContentInputSchema = z.object({
  resumeData: z
    .string()
    .describe('The complete resume data to be improved.'),
});
export type ImproveResumeContentInput = z.infer<
  typeof ImproveResumeContentInputSchema
>;

const ImproveResumeContentOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved resume content with suggestions.'),
});
export type ImproveResumeContentOutput = z.infer<
  typeof ImproveResumeContentOutputSchema
>;

export async function improveResumeContent(
  input: ImproveResumeContentInput
): Promise<ImproveResumeContentOutput> {
  return improveResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResumeContentPrompt',
  input: {schema: ImproveResumeContentInputSchema},
  output: {schema: ImproveResumeContentOutputSchema},
  prompt: `You are an AI resume expert. Review the following resume content and provide suggestions to improve the content, including grammar, phrasing, and keyword optimization. Return the improved resume content. 

Resume Content:
{{{resumeData}}}`,
});

const improveResumeContentFlow = ai.defineFlow(
  {
    name: 'improveResumeContentFlow',
    inputSchema: ImproveResumeContentInputSchema,
    outputSchema: ImproveResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
