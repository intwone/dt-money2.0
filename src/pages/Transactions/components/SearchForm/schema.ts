import * as zod from 'zod'

export const schema = zod.object({
  query: zod.string()
})

export type SearchFormInputs = zod.infer<typeof schema>