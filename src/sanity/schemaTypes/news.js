import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Automatically generate slug from the title
        maxLength: 96, // Limit the length of the slug
      },
      validation: Rule => Rule.required() // Optional: make slug required
    },
    {
      name: 'isFeatured', // New field to indicate if the news is featured
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false, // Default value
    },
  ],
});
