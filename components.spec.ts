import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.naver.com');
  await page.waitForLoadState('domcontentloaded');
});

test('메일 버튼 클릭 시 새 탭으로 이동', async ({ page }) => {
  const [mailPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://mail.naver.com"]').click()
  ]);
  await mailPage.waitForLoadState('domcontentloaded');
  await expect(mailPage).toHaveURL(/mail\.naver\.com/);
  await mailPage.close();
});

test('카페 버튼 클릭 시 새 탭으로 이동', async ({ page }) => {
  const [cafePage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://cafe.naver.com"]').click()
  ]);
  await cafePage.waitForLoadState('domcontentloaded');
  await expect(cafePage).toHaveURL(/cafe\.naver\.com|section\.cafe/);
  await cafePage.close();
});

test('블로그 버튼 클릭 시 새 탭으로 이동', async ({ page }) => {
  const [blogPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://blog.naver.com"]').click()
  ]);
  await blogPage.waitForLoadState('domcontentloaded');
  await expect(blogPage).toHaveURL(/blog\.naver\.com/);
  await blogPage.close();
});

test('더보기 버튼 클릭 후 날씨 버튼 클릭 → 새 탭 이동', async ({ page }) => {
  const moreBtn = page.locator('a.link_service[role="button"]');
  await moreBtn.click();

  const [weatherPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://weather.naver.com"]').click()
  ]);
  await weatherPage.waitForLoadState('domcontentloaded');
  await expect(weatherPage).toHaveURL(/weather\.naver\.com/);
  await weatherPage.close();
});

test('더보기 버튼 다시 클릭 → 펼침 닫힘 확인', async ({ page }) => {
  const moreBtn = page.locator('a.link_service[role="button"]');
  await moreBtn.click(); // 펼침
  await moreBtn.click(); // 다시 클릭 → 닫힘

  const shortcutLayer = page.locator('.shortcut_layer');
  const isClosed = await shortcutLayer.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
  });
  expect(isClosed).toBeTruthy();
});
