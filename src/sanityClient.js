import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '7izr8l1m', // Replace with your project ID
  dataset: 'production', // or your dataset name
  useCdn: false, // `false` if you want to always fetch fresh data
  apiVersion: '2024-06-01', // use current date or specific API version
   token: 'skyRFnrtsEwhZkrf0DhuuPiFMIl4185NUz6KFr4K40IDPBQQRI6zANxudM04pFJezi2dunoeZsHDFWW2CL3qtEcNFkCh34iJJ3yLmJcl8sPpXzDYWA31z25xdF3DIwiUzCQUdeqcHDWRu4bWKWXnCTwxrgjLZh13t4QW0jCtG2XmoyTG0hxm', // Optional: Use if you have a token for authenticated requests
  ignoreBrowserTokenWarning: true,
});

export default client;

