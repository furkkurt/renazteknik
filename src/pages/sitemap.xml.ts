import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	const blogPosts = await getCollection('blog');
	const siteURL = site?.toString() || 'https://renazteknik.com';

	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/hakkimizda', priority: '0.8', changefreq: 'monthly' },
		{ url: '/iletisim', priority: '0.9', changefreq: 'monthly' },
		{ url: '/sss', priority: '0.8', changefreq: 'monthly' },
		{ url: '/blog', priority: '0.9', changefreq: 'weekly' },
		{ url: '/musteri-yorumlari', priority: '0.8', changefreq: 'weekly' },
		{ url: '/sihhi-tesisat', priority: '0.9', changefreq: 'monthly' },
		{ url: '/kombi-bakim-ve-ariza-cozumleri', priority: '0.9', changefreq: 'monthly' },
		{ url: '/petek-temizligi', priority: '0.9', changefreq: 'monthly' },
		{ url: '/tikaniklik-acma', priority: '0.9', changefreq: 'monthly' },
		{ url: '/su-kacagi-tespiti', priority: '0.9', changefreq: 'monthly' },
		{ url: '/batarya-musluk-klozet-tamir-degisimi', priority: '0.9', changefreq: 'monthly' },
		{ url: '/banyo-mutfak-yenileme-tadilat', priority: '0.9', changefreq: 'monthly' },
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${siteURL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${blogPosts
	.map(
		(post) => `  <url>
    <loc>${siteURL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.data.pubDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};

