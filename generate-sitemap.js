const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

// Gantilah dengan URL situs Anda
const siteUrl = 'https://www.nutricocopeat.com';

// Daftar URL yang akan dimasukkan ke dalam sitemap
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
];

// Buat instance SitemapStream
const sitemap = new SitemapStream({ hostname: siteUrl });
const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));

// Menangani error pada aliran penulisan
writeStream.on('error', (err) => {
  console.error('Error writing sitemap:', err);
});

// Pipe stream dan tambahkan link
sitemap.pipe(writeStream);
links.forEach((link) => sitemap.write(link));
sitemap.end();

writeStream.on('finish', () => {
  console.log('Sitemap created successfully');
});
