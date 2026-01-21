const { faker } = require("@faker-js/faker")


console.log({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  profession: faker.person.jobTitle(),
  age: faker.date.birthdate()
})