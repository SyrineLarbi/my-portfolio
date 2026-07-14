import { z } from 'zod'

import { PERSONAS } from './persona'

export const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  persona: z.enum(PERSONAS).optional(),
})

export type ContactInput = z.infer<typeof ContactSchema>