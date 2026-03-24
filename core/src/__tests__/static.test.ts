import { expect, test } from 'vitest';
import { dmsScrape } from '../index.ts';
import { articleSchema } from './articleSchema.ts';

test('scrape cool3c', async () => {
  const result = await dmsScrape('https://www.cool3c.com/article/202079');
  expect(result).toMatchObject(articleSchema);
});

test('scrape kocpc', async () => {
  const result = await dmsScrape('https://www.kocpc.com.tw/archives/563640');
  expect(result).toMatchObject(articleSchema);
});

test('scrape mashdigi', async () => {
  const result = await dmsScrape(
    'https://mashdigi.com/qualcomm-continues-to-launch-the-snapdragon-x-plus-processor-composed-of-8-sets-of-performance-cores-expanding-the-copilot-pc-product-lineup/',
  );
  expect(result).toMatchObject(articleSchema);
});

// TODO: fix failed test here
// test('scrape sogi', async () => {
//   const result = await dmsScrape(
//     'https://www.sogi.com.tw/articles/samsung_galaxy_s25_ultra/6262880',
//   );
//   expect(result).toMatchObject(articleSchema);
// });

test('scrape technews', async () => {
  const result = await dmsScrape(
    'https://technews.tw/2024/09/12/snapdragon-8-gen-4-and-dimensity-9400-configuration-unveiled/',
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape xfastest', async () => {
  const result = await dmsScrape('https://www.xfastest.com/thread-291944-1-1.html');
  expect(result).toMatchObject(articleSchema);
});

test('scrape ettoday', async () => {
  const result = await dmsScrape('https://www.ettoday.net/news/20240905/2810968.htm');
  expect(result).toMatchObject(articleSchema);
});

test('scrape udn', async () => {
  const result = await dmsScrape('https://udn.com/news/story/7240/8145957');
  expect(result).toMatchObject(articleSchema);
});

test('scrape money udn', async () => {
  const result = await dmsScrape('https://money.udn.com/money/story/5613/8231957');
  expect(result).toMatchObject(articleSchema);
});

test('scrape ltn 3c', async () => {
  const result = await dmsScrape('https://3c.ltn.com.tw/news/59270');
  expect(result).toMatchObject(articleSchema);
});

test('scrape ltn ec', async () => {
  const result = await dmsScrape('https://ec.ltn.com.tw/article/breakingnews/4790282');
  expect(result).toMatchObject(articleSchema);
});

// TODO: fix failed test here
// test('scrape techorange', async () => {
//   const result = await dmsScrape(
//     'https://buzzorange.com/techorange/2024/10/03/eu-plans-to-hit-china-based-ev-makers-with-additional-tariffs/',
//   );
//   expect(result).toMatchObject(articleSchema);
// });

test('scrape inside', async () => {
  const result = await dmsScrape(
    'https://www.inside.com.tw/article/36326-meta-announces-300-quest-3s-a-cheaper',
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape compotechasia', async () => {
  const result = await dmsScrape('https://www.compotechasia.com/a/press/2024/0919/58658.html');
  expect(result).toMatchObject(articleSchema);
});

test('scrape xfastest bug', async () => {
  const result = await dmsScrape('https://www.xfastest.com/thread-292861-1-1.html');
  expect(result).toMatchObject(articleSchema);
});

test('scrape eprice bug', async () => {
  const result = await dmsScrape('https://www.eprice.com.tw/mobile/talk/6113/5812708/1');
  expect(result).toMatchObject(articleSchema);
});

//  TODO: fix later
// test('scrape sogi unwanted content', async () => {
//   const result = await dmsScrape('https://www.sogi.com.tw/articles/realme_13_pro_plus/6263085');
//   expect(result).toMatchObject(articleSchema);
// });

// TODO: unable to fix now
// test('scrape digitimes undefined bug', async () => {
//   const result = await dmsScrape(
//     'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?cnlid=1&id=0000703998_EAN8YJ9ZLL4AQU7Z9IWZT',
//   );
//   expect(result).toMatchObject(articleSchema);
// });

test('scrape money udn bug', async () => {
  const result = await dmsScrape('https://money.udn.com/money/story/123398/8284364');
  expect(result).toMatchObject(articleSchema);
});

test('scrape eprice alternative', async () => {
  const result = await dmsScrape('https://www.eprice.com.tw/mobile/talk/4523/5811558/1/');
  expect(result).toMatchObject(articleSchema);
});

test('scrape money udn alternative', async () => {
  const result = await dmsScrape('https://money.udn.com/money/story/5612/8219989');
  expect(result).toMatchObject(articleSchema);
});

test('scrape setn', async () => {
  const result = await dmsScrape('https://www.setn.com/News.aspx?NewsID=1526574');
  expect(result).toMatchObject(articleSchema);
});

test('scrape mashdigi benchmark bug', async () => {
  const result = await dmsScrape(
    'https://mashdigi.com/ul-benchmark-cooperates-with-mediatek-to-add-a-test-project-called-opacity-micromap-to-the-android-version-of-3dmark/',
  );
  expect(result).toMatchObject(articleSchema);
});

test('scrape money udn no match found', async () => {
  const result = await dmsScrape('https://money.udn.com/money/story/5612/8282066');
  expect(result).toMatchObject(articleSchema);
});

// TODO: sogi fix
// test('scrape sogi mediatek', async () => {
//   const result = await dmsScrape('https://www.sogi.com.tw/articles/mediatek/6263140');
//   expect(result).toMatchObject(articleSchema);
// });
//
// test('scrape sogi promotion', async () => {
//   const result = await dmsScrape(
//     'https://www.sogi.com.tw/articles/samsung_galaxy_tab_s10_ultra/6263080',
//   );
//   expect(result).toMatchObject(articleSchema);
// });

test('scrape cool3c bug', async () => {
  const result = await dmsScrape('https://www.cool3c.com/article/226021');
  expect(result).toMatchObject(articleSchema);
});

test('scrape ltn 3c secondary', async () => {
  const result = await dmsScrape('https://3c.ltn.com.tw/news/59704');
  expect(result).toMatchObject(articleSchema);
});

// TODO: fix
// test('scrape wealth', async () => {
//   const result = await dmsScrape(
//     'https://www.wealth.com.tw/articles/58979cfd-28f3-408a-bdad-28dbad4af9b0',
//   );
//   expect(result).toMatchObject(articleSchema);
// });

//  TODO: fix TypeError: Cannot read properties of undefined (reading 'split')
// test('scrape cnyes', async () => {
//   const result = await dmsScrape('https://news.cnyes.com/news/id/5745265');
//   expect(result).toMatchObject(articleSchema);
// });

// TODO: pending movee to manual.test.ts
// test('scrape chinatimes newspaper', async () => {
//   const result = await dmsScrape(
//     'https://www.chinatimes.com/newspapers/20240820000224-260204?chdtv',
//   );
//   expect(result).toMatchObject(articleSchema);
// });
