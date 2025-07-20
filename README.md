# Playwright Naver Test 

firefox 브라우저로 네이버 메인 페이지의 다양한 기능 버튼에 대한 테스트를 Playwright로 수행해보았습니다.

## 테스트 대상
- 네이버 메인 페이지 접근 확인
- 각 주요 컴포넌트 버튼 클릭 시 새 탭에서 올바른 URL로 이동하는지 확인

## 사용 기술
- Playwright
- TypeScript

## 실행 방법
```bash
npx playwright test --project=firefox