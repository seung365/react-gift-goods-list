## 1단계 📝 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의해요.
- [x] React Query를 사용하지 말고 axios 를 사용해서 구현해요.
- [x] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현해요.

- 메인 페이지 - Theme 카테고리 섹션
- [x] /api/v1/themes API를 사용하여 Section을 구현해요.
- 메인 페이지 - 실시간 급상승 선물랭킹 섹션
- [x] /api/v1/ranking/products API를 사용하여 Section을 구현해요. (Axios 사용 가능)
- [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.
- Theme 페이지 - header
- [x] url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현해요.
- [x] themeKey가 잘못 된 경우 메인 페이지로 연결해요.
- Theme 페이지 - 상품 목록 섹션
- [x] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현해요.
- [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.

## 2단계 📝 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 각 API에서 Loading 상태에 대한 UI 대응을 해요. => loading 중인 경우 UI 처리
- [x] 데이터가 없는 경우에 대한 UI 대응을 해요. => errorMessage란 상태를 두어 처리
- [x] Http Status에 따라 Error를 다르게 처리해요. => errorHandler.ts를 사용하여 처리

## 3단계 📝 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- [x] 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.
