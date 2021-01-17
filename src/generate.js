const fs = require('fs');
const faker = require('faker');

function generateData() {

  const data = [];

  for (let i = 0; i < 25; i++) {
    data.push({
      timestamp: faker.date.recent(faker.random.number(30)),
      count: faker.random.number(20000)
    });
  }

  
  return data;
}

fs.writeFileSync("data.json", JSON.stringify(generateData(), null, 2));