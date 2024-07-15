import type { AxiosError } from 'axios';
import axios from 'axios';

export const handleError = (error: AxiosError): string => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    if (status >= 100 && status < 200) {
      return '정보 제공 응답입니다. 계속 진행해 주세요.';
    } else if (status >= 300 && status < 400) {
      return '리다이렉션이 필요합니다. 요청한 URI가 이동되었습니다.';
    } else if (status >= 400 && status < 500) {
      return '데이터를 불러오는 중에 문제가 발생했습니다.';
    } else if (status >= 500) {
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }
  }
  return '알 수 없는 오류가 발생했습니다.';
};
