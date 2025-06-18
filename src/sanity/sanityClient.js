   import sanityClient from '@sanity/client';

   export default sanityClient({
     projectId: '7izr8l1m',
     dataset: 'production', 
     useCdn: true, // `false` if you want to ensure fresh data
   });
   