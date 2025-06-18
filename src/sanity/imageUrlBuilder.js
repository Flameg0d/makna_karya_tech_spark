// src/sanity/imageUrlBuilder.js
import imageUrlBuilder from '@sanity/image-url';
import client from './sanityClient'; // Ensure this path is correct

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
