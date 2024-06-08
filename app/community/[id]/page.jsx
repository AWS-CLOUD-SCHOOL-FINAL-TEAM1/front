'use client';

import { useParams } from 'next/navigation';

const CommunityCardDetail = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>Card Detail for ID: {id}</h1>
      {/* 세부 정보 표시 */}
    </div>
  );
};

export default CommunityCardDetail;
