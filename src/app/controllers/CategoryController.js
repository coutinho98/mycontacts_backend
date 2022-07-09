const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const categories = await CategoriesRepository.findById(id);

    if (!categories) {
      return response.status(404).json({ error: 'Categorie not found' });
    }
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categorieExist = await CategoriesRepository.findById(id);
    if (!categorieExist) {
      return response.json(404).json({ error: 'Categorie not found' });
    }

    const categorie = await CategoriesRepository.update(id, {
      name,
    });
    response.json(categorie);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
