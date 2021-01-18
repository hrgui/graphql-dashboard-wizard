const fs = require('fs');
const faker = require('faker');

function generateData() {

  const data = [];


  const pointerDate = new Date("2021-01-01 00:00:00");
  
  for (let i = 0; i < 365; i++) {
    data.push({
      timestamp: pointerDate.toString(),
      count: faker.random.number(20000)
    });

    pointerDate.setDate(pointerDate.get1Date() + 1)
  }

  
  return data;
}

fs.writeFileSync("data.json", JSON.stringify(generateData(), null, 2));