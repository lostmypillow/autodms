import { expect, test } from 'vitest';
import { dmsScrape } from '../index.ts';
import { articleSchema } from './articleSchema.ts';
import compotechHtml from '../assets/compotech.html?raw';
import bcnextHtml from '../assets/bnext.html?raw';
import type { NewsArticle } from '../types.ts';
import chinatestHtml from '../assets/chinatest.html?raw';
import cteeHtml from '../assets/ctee.html?raw';
import digitimes1Html from '../assets/digitimes1.html?raw';
import digitimes3Html from '../assets/digitimes3.html?raw';
import digitimes4Html from '../assets/digitimes4.html?raw';
import investorHtml from '../assets/investor.html?raw';
import nextappleHtml from '../assets/nextapple.html?raw';
import saydigitHtml from '../assets/saydigit.html?raw';
import setnHtml from '../assets/setn.html?raw';
import techrangeHtml from '../assets/techrange.html?raw';
import wealthHtml from '../assets/wealth.html?raw';

test('scrape chinatimes', async () => {
  const result = await dmsScrape(
    'https://www.chinatimes.com/realtimenews/20241010003610-260410?chdtv',
    chinatestHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape ctee', async () => {
  const result = await dmsScrape('https://www.ctee.com.tw/news/20241011700170-439901', cteeHtml);
  expect(result).toMatchObject(articleSchema);
});

test('scrape digitimes 1', async () => {
  const result = await dmsScrape(
    'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?CnlID=1&cat=40&id=0000704572_U324G0818MRM9Y1TCLWJR',
    digitimes1Html,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape digitimes 3', async () => {
  const result = await dmsScrape(
    'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?id=0000700414_DTZ3HLET2I9D7N38H02NN',
    digitimes3Html,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape digitimes 4', async () => {
  const result = await dmsScrape(
    'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?cnlid=1&id=0000703998_EAN8YJ9ZLL4AQU7Z9IWZT',
    digitimes4Html,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape investor', async () => {
  const result = await dmsScrape(
    'https://investor.com.tw/onlineNews/NewsContent.asp?articleNo=14202409120038',
    investorHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape nextapple', async () => {
  const result = await dmsScrape(
    'https://tw.nextapple.com/finance/20240912/7A4B2B3C5D6E7F8A9B0C1D2E3F4G5H6',
    nextappleHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape saydigit', async () => {
  const result = await dmsScrape(
    'https://www.saydigi.com/2024/09/saydigit-test-article.html',
    saydigitHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape setn', async () => {
  const result = await dmsScrape('https://www.setn.com/News.aspx?NewsID=1526574', setnHtml);
  expect(result).toMatchObject(articleSchema);
});

test('scrape techorange', async () => {
  const result = await dmsScrape(
    'https://buzzorange.com/techorange/2024/10/03/eu-plans-to-hit-china-based-ev-makers-with-additional-tariffs/',
    techrangeHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape wealth', async () => {
  const result = await dmsScrape(
    'https://www.wealth.com.tw/articles/58979cfd-28f3-408a-bdad-28dbad4af9b0',
    wealthHtml,
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape compotech', async () => {
  const result = await dmsScrape(
    'https://www.compotechasia.com/a/new_product/2024/0919/58658.html',
    compotechHtml,
  );

  expect(result).toMatchObject(articleSchema);
});
test('scrape bnext', async () => {
  const result: NewsArticle = await dmsScrape(
    'https://www.bnext.com.tw/article/80873/amd-ryzen-ai-pro-300-business-ai-pc',
    bcnextHtml,
  );

  expect(result).toMatchObject(articleSchema);
});
