'use client';

import { useParams } from 'next/navigation';

const CardDetail = () => {
  const params = useParams();
  const { id } = params;

  // 여기서 ID를 사용하여 카드의 세부 정보를 가져옵니다. 예를 들어 API 호출 또는 로컬 데이터베이스에서 가져올 수 있습니다.

  return (
    <div>
      <h1>Card Detail for ID: {id}</h1>
      {/* 세부 정보 표시 */}
    </div>
  );
};

export default CardDetail;
