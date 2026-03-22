import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { postSchema } from './src/lib/sanity/schemas/post'

export default defineConfig({
  name: 'santosh-studio',
  title: 'Santosh Petrochemical',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [postSchema],
  },
})
