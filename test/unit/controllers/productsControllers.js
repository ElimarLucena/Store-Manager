const sinon = require('sinon');
const { expect } = require('chai');

const services = require('../../../services/productsService');
const {
  getAll,
  getByProductId,
  createNewProduct,
  upDateProduct,
  deleteProduct,
} = require('../../../controllers/productsController');

describe('Teste da camada Controllers relacionada ao produto.', () => {
  describe('Quando o produto já existe', () => {
    const req = {}

    const res = {};

    before(() => {
      req.body = {
        name: 'Martelo de Thor',
        quantity: 10,
      };

      sinon.stub(services, 'createNewProduct').resolves(null);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ message: 'Product already exists' });
    });

    after(() => {
      services.createNewProduct.restore();
    });

    it ('status retornado com o código 409', async () => {
      await createNewProduct(req, res);

      expect(res.status.calledWith(409)).to.be.equal(true);
    });

    it ('json com mensagem "Product already exists"', async () => {
      await createNewProduct(req, res);

      expect(res.json()).to.include({ message: 'Product already exists' });
    });
  });

  describe('Quando um produto é inserido com sucesso.', () => {
    const req = {}

    const res = {};

    const newProduct = {
      id: 1,
      name: 'produto',
      quantity: 10,
    };

    before(() => {
      req.body = {
        name: 'produto',
        quantity: 10,
      };

      sinon.stub(services, 'createNewProduct').resolves(newProduct)

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(newProduct);
    });

    after(() => {
      services.createNewProduct.restore();
    });

    it ('status retornado com o código 201', async () => {
      await createNewProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it ('retorna um objeto', async () => {
      await createNewProduct(req, res);

      expect(res.json()).to.be.a('object');
      expect(res.json()).to.be.property('quantity');
      expect(res.json()).to.include({ name: 'produto'});
    });
  });
});