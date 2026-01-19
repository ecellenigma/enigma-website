import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, url }) {
    const siteTitle = "Enigma E-Cell NMIT";
    const defaults = {
        title: "Enigma E-Cell NMIT | Entrepreneurship Cell",
        description: "Enigma is the student-run Entrepreneurship Cell of Nitte Meenakshi Institute of Technology (NMIT). We foster a startup ecosystem, mentorship, and innovation for aspiring student entrepreneurs in Bangalore.",
        keywords: "E-Cell NMIT, Enigma NMIT, Entrepreneurship Cell, Nitte Meenakshi Institute of Technology, Student Startups, Incubation Center Bangalore, NMIT Events, Enigma, Ecell",
        image: "/logos/enigma.png",
        url: "https://ecellnmit.in" // Replace with actual domain
    };

    const seo = {
        title: title ? `${title} | ${siteTitle}` : defaults.title,
        description: description || defaults.description,
        key: keywords || defaults.keywords,
        image: image || defaults.image,
        url: url || defaults.url
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.key} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={seo.image} />

            {/* Favicon / Theme */}
            <meta name="theme-color" content="#FFB800" />
        </Helmet>
    );
}
