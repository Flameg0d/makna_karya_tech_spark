   require('dotenv').config(); // Load environment variables

   const axios = require('axios');
   const sanityClient = require('@sanity/client');

   const client = sanityClient({
        projectId: '7izr8l1m', // Replace with your project ID
        dataset: 'production', // or your dataset name
        token: 'skyRFnrtsEwhZkrf0DhuuPiFMIl4185NUz6KFr4K40IDPBQQRI6zANxudM04pFJezi2dunoeZsHDFWW2CL3qtEcNFkCh34iJJ3yLmJcl8sPpXzDYWA31z25xdF3DIwiUzCQUdeqcHDWRu4bWKWXnCTwxrgjLZh13t4QW0jCtG2XmoyTG0hxm', // Optional: Use if you have a token for authenticated requests
        useCdn: false, // Set to false to ensure fresh data
    });

   // Fetch news articles from NewsAPI
   const fetchNews = async () => {
     try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
        country: 'id', // Change to your desired country code
        apiKey: 'b995a010ec534ddc9d130a06ef3b23e4', // Replace with your NewsAPI key
      },
    });

       const articles = response.data.articles;

       // Prepare data for Sanity
       const newsDocuments = articles.map(article => ({
         _type: 'news',
         title: article.title,
         description: article.description,
         url: article.url,
         image: {
           _type: 'image',
           asset: {
             _type: 'reference',
             _ref: article.urlToImage ? article.urlToImage : null, // Handle image URL appropriately
           },
         },
         date: article.publishedAt,
       }));

       // Create documents in Sanity
       await client.createIfNotExists(newsDocuments);
       console.log('News articles added to Sanity!');
     } catch (error) {
       console.error('Error fetching news:', error);
     }
   };

   // Run the fetch function
   fetchNews();
   