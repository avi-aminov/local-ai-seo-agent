import axios from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { HeadingLevel, SeoScanResult } from '../types/seo.types.js';

const headingLevels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function text($: CheerioAPI, selector: string): string {
  return $(selector).first().text().replace(/\s+/g, ' ').trim();
}

function attr($: CheerioAPI, selector: string, attribute: string): string | null {
  const value = $(selector).first().attr(attribute);
  return value ? value.trim() : null;
}

function getVisibleText($: CheerioAPI): string {
  $('script, style, noscript, svg').remove();
  return $('body').text().replace(/\s+/g, ' ').trim();
}

function getSchemaTypes(rawJsonLd: string): string[] {
  try {
    const parsed = JSON.parse(rawJsonLd);
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    return nodes
      .map((node) => node?.['@type'])
      .flat()
      .filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

function classifyLinks($: CheerioAPI, pageUrl: URL): SeoScanResult['links'] {
  const links = { internal: 0, external: 0, empty: 0 };

  $('a').each((_, element) => {
    const href = ($(element).attr('href') || '').trim();

    if (!href || href === '#') {
      links.empty += 1;
      return;
    }

    try {
      const resolved = new URL(href, pageUrl);
      if (resolved.hostname === pageUrl.hostname) {
        links.internal += 1;
      } else {
        links.external += 1;
      }
    } catch {
      links.empty += 1;
    }
  });

  return links;
}

export async function scanSeo(url: string): Promise<SeoScanResult> {
  const response = await axios.get<string>(url, {
    timeout: 10000,
    maxRedirects: 5,
    responseType: 'text',
    headers: {
      'User-Agent': 'LocalAISEOAgent/0.1 (+https://github.com)',
      Accept: 'text/html,application/xhtml+xml',
    },
    validateStatus: (status) => status >= 200 && status < 400,
  });

  const finalUrl = response.request?.res?.responseUrl || url;
  const pageUrl = new URL(finalUrl);
  const $ = cheerio.load(response.data);

  const headings = headingLevels.reduce<SeoScanResult['headings']>((result, level) => {
    result[level] = $(level)
      .map((_, element) => $(element).text().replace(/\s+/g, ' ').trim())
      .get()
      .filter(Boolean);
    return result;
  }, { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] });

  const missingAltSamples: string[] = [];
  let missingAlt = 0;

  $('img').each((_, element) => {
    const src = ($(element).attr('src') || '').trim();
    const alt = ($(element).attr('alt') || '').trim();

    if (!alt) {
      missingAlt += 1;
      if (src && !src.startsWith('data:') && missingAltSamples.length < 5) {
        missingAltSamples.push(src);
      }
    }
  });

  const schemaTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, element) => {
    schemaTypes.push(...getSchemaTypes($(element).text()));
  });

  const visibleText = getVisibleText($);

  return {
    url,
    finalUrl,
    title: text($, 'title'),
    metaDescription: attr($, 'meta[name="description"]', 'content') || '',
    canonical: attr($, 'link[rel="canonical"]', 'href'),
    robots: attr($, 'meta[name="robots"]', 'content'),
    viewport: attr($, 'meta[name="viewport"]', 'content'),
    headings,
    images: {
      total: $('img').length,
      missingAlt,
      missingAltSamples,
    },
    links: classifyLinks($, pageUrl),
    openGraph: {
      title: attr($, 'meta[property="og:title"]', 'content'),
      description: attr($, 'meta[property="og:description"]', 'content'),
      image: attr($, 'meta[property="og:image"]', 'content'),
      url: attr($, 'meta[property="og:url"]', 'content'),
    },
    schema: {
      count: $('script[type="application/ld+json"]').length,
      types: [...new Set(schemaTypes)],
    },
    content: {
      textLength: visibleText.length,
      wordCount: visibleText ? visibleText.split(/\s+/).length : 0,
    },
  };
}

