import {BiHomeHeart} from 'react-icons/bi'
const HomePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      type: 'seo',
    },
    {name: 'sections', type: 'array', of: [{type: 'homePage.hero'}]},
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },

    prepare: ({title, subtitle}: {[_key: string]: string}) => ({
      title,
      subtitle,
      icon: BiHomeHeart,
    }),
  },
}

export default HomePage
