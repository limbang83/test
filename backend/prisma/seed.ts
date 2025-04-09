import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기존 지역 데이터 삭제
  await prisma.region.deleteMany();

  // 지역 데이터 생성
  const regions = [
    { name: '서울' },
    { name: '경기' },
    { name: '인천' },
    { name: '대전' },
    { name: '세종' },
    { name: '충남' },
    { name: '충북' },
    { name: '강원' },
    { name: '부산' },
    { name: '울산' },
    { name: '대구' },
    { name: '경북' },
    { name: '경남' },
    { name: '전남' },
    { name: '전북' },
    { name: '광주' },
    { name: '제주' },
  ];

  for (const region of regions) {
    await prisma.region.create({
      data: region
    });
  }

  console.log('지역 데이터 초기화 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 