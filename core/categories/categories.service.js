const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  /**
   * @private
   */
  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department()
      });
    }
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(c => c.id === id);
  }

  create(data) {
    const { name } = data;
    const newCategory = {
      id: faker.datatype.uuid(),
      name
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id, changes) {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return {
      ok: true,
      msg: `Category ${id} deleted`
    };
  }
}

module.exports = CategoriesService;
