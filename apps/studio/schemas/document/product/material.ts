import {GiChemicalDrop} from 'react-icons/gi'
import {Rule} from 'sanity'

const Material = {
  name: 'material',
  title: 'Material',
  type: 'document',
  icon: GiChemicalDrop,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}: any) {
      return {
        title,
        subtitle,
        icon: GiChemicalDrop,
      }
    },
  },
}

export default Material