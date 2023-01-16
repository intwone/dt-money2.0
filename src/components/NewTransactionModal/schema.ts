import * as zod from 'zod'

export const schema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

export type NewTransactionFormInputs = zod.infer<typeof schema>