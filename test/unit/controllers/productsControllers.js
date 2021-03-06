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
  describe('Testando função que retorna todos os produtos cadastrados no banco de dados', () => {
    describe('Quando a buscar pelos produtos não tem sucesso', () => {
      const req = {};
  
      const res = {};
  
      before(() => {
        sinon.stub(services, 'getAll').resolves([]);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
  
      after(() => {
        services.getAll.restore();
      });
  
      it ('status retornado com o código 200', async () => {
        await getAll(req, res);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
  
      it ('retorna um array vazio', async () => {
        await getAll(req, res);
  
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Quando a buscar pelos produtos tem sucesso.', () => {
      const req = {};

      const res = {};

      const products = [
        { id: 1, name: 'Martelo de Thor', quantity: 10 },
        { id: 2, name: 'Traje de encolhimento', quantity: 20 },
        { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
      ];

      before(() => {
        sinon.stub(services, 'getAll').resolves(products);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(products);
      });

      after(() => {
        services.getAll.restore();
      });

      it ('status retornado com o código 200', async () => {
        await getAll(req, res);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it ('retorna um array com todos os produtos', async () => {
        await getAll(req, res);
  
        expect(res.json()).to.be.a('array');
        expect(res.json()).to.be.lengthOf(3);
        expect(res.json()).to.deep.include({ id: 1, name: 'Martelo de Thor', quantity: 10 });
      });
    });
  });

  describe('Testando função que retorna um produto de acordo com seu número de "id".', () => {
    describe('Quando o produto não é retornado com sucesso.', () => {
      const req = {};

      const res = {};

      before(() => {
        req.params = 1;

        sinon.stub(services, 'getByProductId').resolves(null);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Product not found' });
      });

      after(() => {
        services.getByProductId.restore();
      });

      it ('status retornado com o código 404', async () => {
        await getByProductId(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await getByProductId(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('message');
        expect(res.json()).to.include({ message: 'Product not found' });
      });
    });

    describe('Quando o produto é retornado com sucesso.', () => {
      const req = {};

      const res = {};

      before(() => {
        req.params = 1;

        const result = { id: 1, name: 'Martelo de Thor', quantity: 10 };

        sinon.stub(services, 'getByProductId').resolves(result);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(result);
      });

      after(() => {
        services.getByProductId.restore();
      });

      it ('status retornado com o código 200', async () => {
        await getByProductId(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await getByProductId(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('id');
        expect(res.json()).to.include({ id: 1, name: 'Martelo de Thor', quantity: 10 });
      });
    });
  });

  describe('Testando função que cadastra um novo produto no banco de dados.', () => {
    describe('Quando o produto já existe', () => {
      const req = {};
  
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

  describe('Testando função que atualizar um produto no banco de dados.', () => {
    describe('Quando o produto não é atualizado com sucesso', () => {
      const req = {};
  
      const res = {};

      before(() => {
        req.params = 1;

        req.body = { name: 'Martelo do Thor', quantity: 10 };

        sinon.stub(services, 'upDateProduct').resolves(null);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Product not found' });
      });

      after(() => {
        services.upDateProduct.restore();
      });

      it ('status retornado com o código 404', async () => {
        await upDateProduct(req, res);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await upDateProduct(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('message');
        expect(res.json()).to.include({ message: 'Product not found' });
      });
    });

    describe('Quando o produto é atualizado com sucesso', () => {
      const req = {};
  
      const res = {};

      const objUpdate = { id: 1, name: 'Martelo', quantity: 10 };

      before(() => {
        req.params = 1;

        req.body = { name: 'Martelo', quantity: 10 };

        sinon.stub(services, 'upDateProduct').resolves(true);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(objUpdate);
      });

      after(() => {
        services.upDateProduct.restore();
      });

      it ('status retornado com o código 200', async () => {
        await upDateProduct(req, res);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await upDateProduct(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('quantity');
        expect(res.json()).to.include({ id: 1, name: 'Martelo', quantity: 10 });
      });
    });
  });

  describe('Testando função que deleta um produto no banco de dados.', () => {
    describe('Quando o produto não é deletado com sucesso.', () => {
      const req = {};
  
      const res = {};

      before(() => {
        req.params = 1;

        sinon.stub(services, 'deleteProduct').resolves(null);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Product not found' });
      });

      after(() => {
        services.deleteProduct.restore();
      });

      it ('status retornado com o código 404', async () => {
        await deleteProduct(req, res);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await deleteProduct(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('message');
        expect(res.json()).to.include({ message: 'Product not found' });
      });
    });

    describe('Quando o produto é deletado com sucesso.', () => {
      const req = {};
  
      const res = {};

      before(() => {
        req.params = 1;

        sinon.stub(services, 'deleteProduct').resolves(true);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(() => {
        services.deleteProduct.restore();
      });

      it ('status retornado com o código 204', async () => {
        await deleteProduct(req, res);
  
        expect(res.status.calledWith(204)).to.be.equal(true);
      });
    });
  });
});