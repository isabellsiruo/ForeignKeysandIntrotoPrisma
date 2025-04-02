//prisma/seed.js
const prisma = require('./index');

const seed = async () => {
  //clear existing data just in case
  await prisma.player.deleteMany();

  await prisma.player.createMany({
    data: [
      { name: 'Buddy', breed: 'Labrador', status: 'field' },
      { name: 'Daisy', breed: 'Poodle', status: 'bench' },
      { name: 'Rocky', breed: 'Beagle', status: 'field' },
      { name: 'Luna', breed: 'Husky', status: 'bench' },
      { name: 'Milo', breed: 'Corgi', status: 'field' },
      { name: 'Bella', breed: 'Golden Retriever', status: 'bench' },
      { name: 'Max', breed: 'Bulldog', status: 'field' },
      { name: 'Lucy', breed: 'Boxer', status: 'bench' },
      { name: 'Charlie', breed: 'Dalmatian', status: 'field' },
      { name: 'Coco', breed: 'Shih Tzu', status: 'bench' },
    ],
  });

  console.log('Players seeded!');
};

seed()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    //disconnect from db
    await prisma.$disconnect(); 
  });
