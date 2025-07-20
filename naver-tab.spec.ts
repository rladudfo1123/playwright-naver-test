import { test, expect } from '@playwright/test';

test('네이버 탭 이동 테스트', async ({ page }) => {
  await page.goto('https://www.naver.com');
  await page.waitForLoadState('domcontentloaded');

  // 뉴스 탭 클릭 (여러 개 중 첫 번째)
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: '뉴스' }).nth(0).click()
  ]);

  await newPage.waitForLoadState('domcontentloaded');
  await expect(newPage).toHaveURL(/news\.naver\.com/);
  
  await newPage.close();

  // 연예 탭 클릭
 const [cafePage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: '카페' }).nth(0).click()
  ]);

  await cafePage.waitForLoadState('domcontentloaded');
  await expect(cafePage).toHaveURL(/cafe\.naver\.com/);
  
  await cafePage.close();

  // 스포츠 탭 클릭
 const [storePage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: '스포츠' }).nth(0).click()
  ]);

  await storePage.waitForLoadState('domcontentloaded');
  await expect(storePage).toHaveURL(/store\.naver\.com/);
  
  await storePage.close();
});