# Dynamic Sitemap API

This repository contains a dynamic sitemap feature implemented in a NestJS application for the [Wellington International](https://wellingtoninternational.com/) website. The API allows users to fetch a sitemap that includes live streams, ring streams, and uploaded videos based on a specified company.

## API Endpoint

To retrieve the sitemap, make a GET request to the following endpoint:
https://api.showgroundslive.com/video-assets/sitemap?company=15

## Requirements

    Node.js
    NestJS
    Additional packages:
        sitemap
        stream-to-promise
        @nestjs/config

## Purpose of the Sitemap

A dynamic sitemap is essential for improving the visibility and indexing of the website's content in search engines. By providing a structured representation of the available video assets, the sitemap helps search engines discover and crawl these assets more efficiently. 

### Use Cases
- **Search Engine Optimization (SEO)**: Ensures that video content is indexed by search engines, increasing visibility and attracting more users.
- **Content Discovery**: Provides users with an easy way to navigate and discover various video assets available on the website.
- **Real-Time Updates**: As new content is added or existing content is modified, the sitemap is dynamically updated, ensuring that search engines have the most current information.
  


