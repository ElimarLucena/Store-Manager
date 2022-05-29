const sinon = require('sinon');
const { expect } = require('chai');

const models = require('../../../models/productsModel');
const {
  getAll,
  getByProductId,
  createNewProduct,
  upDateProduct,
  deleteProduct,
} = require('../../../services/productsService');

describe('Teste da camada Services relacionada ao produto.', () => {
  describe('Quando o produto já existe.', () => {
    const name = 'Martelo de Thor';

    it ('retorna um null', async () => {
      const response = await createNewProduct(name);

      expect(response).to.be.a('null');
      expect(response).to.be.equal(null);
    });
  });

  describe('Quando um produto é inserido com sucesso.', () => {
    const name = "produto";
    const quantity = 10;

    before(() => {
      const id = 1;

      sinon.stub(models, 'createNewProduct').resolves({ insertId: id });
    });

    after(() => {
      models.createNewProduct.restore();
    });

    it ('retorna um objeto', async () => {
      const response = await createNewProduct(name, quantity);

      expect(response).to.be.a('object');
    });

    it ('objeto contém o "id" do novo produto inserido', async () => {
      const response = await createNewProduct(name, quantity);

      expect(response).to.be.property('id');
      expect(response).to.include({ id: 1 });

      expect(response).to.be.property('name');
      expect(response).to.include({ name: 'produto'});
    });
  });
});