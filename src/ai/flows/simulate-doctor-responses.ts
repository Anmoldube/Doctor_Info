'use server';

/**
 * @fileOverview Simulates doctor responses during a chat.
 *
 * - simulateDoctorResponse - A function that simulates a doctor's response given a patient's message.
 * - SimulateDoctorResponseInput - The input type for the simulateDoctorResponse function.
 * - SimulateDoctorResponseOutput - The return type for the simulateDoctorResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateDoctorResponseInputSchema = z.object({
  message: z.string().describe('The patient message to respond to.'),
  doctorName: z.string().describe('The name of the doctor.'),
  patientName: z.string().describe('The name of the patient.'),
  specialization: z.string().describe('The doctor specialization, e.g. Cardiology, Dermatology'),
});
export type SimulateDoctorResponseInput = z.infer<typeof SimulateDoctorResponseInputSchema>;

const SimulateDoctorResponseOutputSchema = z.object({
  response: z.string().describe('The simulated doctor response.'),
});
export type SimulateDoctorResponseOutput = z.infer<typeof SimulateDoctorResponseOutputSchema>;

export async function simulateDoctorResponse(input: SimulateDoctorResponseInput): Promise<SimulateDoctorResponseOutput> {
  return simulateDoctorResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateDoctorResponsePrompt',
  input: {schema: SimulateDoctorResponseInputSchema},
  output: {schema: SimulateDoctorResponseOutputSchema},
  prompt: `You are a helpful doctor. Your name is {{doctorName}}, and you are a specialist in {{specialization}}.

A patient named {{patientName}} has sent you the following message:

{{message}}

Respond to the patient in a helpful and professional manner. Keep the response concise, no more than 5 sentences.`,
});

const simulateDoctorResponseFlow = ai.defineFlow(
  {
    name: 'simulateDoctorResponseFlow',
    inputSchema: SimulateDoctorResponseInputSchema,
    outputSchema: SimulateDoctorResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
