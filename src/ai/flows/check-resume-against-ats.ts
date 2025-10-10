'use server';

/**
 * @fileOverview A flow to check a resume against Applicant Tracking System (ATS) best practices using AI.
 *
 * - checkResumeAgainstATS - A function that handles the resume checking process.
 * - CheckResumeAgainstATSInput - The input type for the checkResumeAgainstATS function.
 * - CheckResumeAgainstATSOutput - The return type for the checkResumeAgainstATS function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckResumeAgainstATSInputSchema = z.string().describe('The resume text to check against ATS best practices.');
export type CheckResumeAgainstATSInput = z.infer<typeof CheckResumeAgainstATSInputSchema>;

const CheckResumeAgainstATSOutputSchema = z.object({
  atsCompatibilityScore: z
    .number()
    .describe(
      'A score indicating the resume ATS compatibility (0-100, higher is better).'
    ),
  suggestions: z.array(z.string()).describe('Suggestions for improving ATS compatibility.'),
});
export type CheckResumeAgainstATSOutput = z.infer<typeof CheckResumeAgainstATSOutputSchema>;

export async function checkResumeAgainstATS(input: CheckResumeAgainstATSInput): Promise<CheckResumeAgainstATSOutput> {
  return checkResumeAgainstATSFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkResumeAgainstATSPrompt',
  input: {schema: CheckResumeAgainstATSInputSchema},
  output: {schema: CheckResumeAgainstATSOutputSchema},
  prompt: `You are an expert resume consultant specializing in Applicant Tracking Systems (ATS).

  Analyze the provided resume text and provide an ATS compatibility score (0-100) and suggestions for improvement.

  Resume Text: {{{$input}}}

  Ensure the suggestions are clear and actionable.

  Output should be in JSON format.
  `,
});

const checkResumeAgainstATSFlow = ai.defineFlow(
  {
    name: 'checkResumeAgainstATSFlow',
    inputSchema: CheckResumeAgainstATSInputSchema,
    outputSchema: CheckResumeAgainstATSOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
