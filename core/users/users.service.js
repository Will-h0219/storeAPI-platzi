const { faker } = require('@faker-js/faker');
// const getConnection = require('../../libs/postgres');
const pool = require('../../libs/postgres.pool');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.addListener('error', (err) => console.error(err));
  }

  generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {

      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        gender: faker.name.gender(),
        phone: faker.phone.number('+57 3## ### ## ##'),
        email: faker.internet.email()
      });
    }
  }

  async find() {
    const rta = await pool.query('SELECT * FROM tasks');
    return rta.rows;
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  create(data) {
    const { name, gender, phone, email } = data;
    const newUser = {
      id: faker.datatype.uuid(),
      name,
      gender,
      phone,
      email
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not fund');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not fund');
    }
    this.users.splice(index, 1);
    return {
      ok: true,
      msg: `User ${id} deleted`
    };
  }
}

module.exports = UsersService;
