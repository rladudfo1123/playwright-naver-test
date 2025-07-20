import { test, expect } from '@playwright/test';

test('네이버 검색창 아래 컴포넌트 버튼 이동 테스트', async ({ page }) => {
  await page.goto('https://www.naver.com');
  await page.waitForLoadState('domcontentloaded');

  // [1] 메일 버튼 → 새 탭
  const [mailPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://mail.naver.com"]').click()
  ]);
  await mailPage.waitForLoadState('domcontentloaded');
  await expect(mailPage).toHaveURL(/mail\.naver\.com/);
  await mailPage.close();

  // [2] 카페 버튼 → 새 탭
  const [cafePage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://cafe.naver.com"]').click()
  ]);
  await cafePage.waitForLoadState('domcontentloaded');
  await expect(cafePage).toHaveURL(/cafe\.naver\.com|section\.cafe/);
  await cafePage.close();

  // [3] 블로그 버튼 → 새 탭
  const [blogPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://blog.naver.com"]').click()
  ]);
  await blogPage.waitForLoadState('domcontentloaded');
  await expect(blogPage).toHaveURL(/blog\.naver\.com/);
  await blogPage.close();

  // 더보기 버튼 함수
  const moreBtn = page.locator('a.link_service[role="button"]');

  // [4] 더보기 버튼 -> 펼침

  await moreBtn.click();


  // [5] 날씨 버튼 -> 새 탭
  const [weatherPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('a[href="https://weather.naver.com"]').click()
  ]);
  await weatherPage.waitForLoadState('domcontentloaded');
  await expect(weatherPage).toHaveURL(/weather\.naver\.com/);
  await weatherPage.close();

  // [6] 더보기 버튼 -> 닫힘

  await moreBtn.click();

  // [7] 더보기 닫힘 확인
  const shortcutLayer = page.locator('.shortcut_layer');
  const isClosed = await shortcutLayer.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
});
  expect(isClosed).toBeTruthy();

});