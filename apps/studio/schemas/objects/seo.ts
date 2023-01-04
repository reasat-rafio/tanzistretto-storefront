import {defineField, defineType} from 'sanity'

const SEO = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
    }),
  ],
})

export default SEO
