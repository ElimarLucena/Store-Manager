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
  describe('Testando função que retorna todos os produtos cadastrados no banco de dados', () => {
    describe('Quando a buscar pelos produtos não tem sucesso.', () => {
      before(async () => {
        const result = [];

        sinon.stub(models, 'getAll').resolves(result);
      });
  
      after(async () => {
        models.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await getAll();
  
        expect(response).to.be.a('array');
      });

      it('retorna um array vazio', async () => {
        const response = await getAll();

        expect(response).to.be.empty;
      });
    });

    describe('Quando a buscar pelos produtos tem sucesso.', () => {
      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });
  
      after(() => {
        models.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await getAll();
  
        expect(response).to.be.a('array');
      });

      it('retorna um array com todos os produtos', async () => {
        const response = await getAll();

        expect(response).to.have.lengthOf(1);
        expect(response).to.deep.include({ id: 1, name: 'Martelo de Thor', quantity: 10 });
      });
    });
  });

  describe('Testando função que retorna um produto de acordo com seu número de "id".', () => {
    describe('Quando o produto não é retornado com sucesso.', () => {
      const id = 1;

      before(() => {
        const result = [];

        sinon.stub(models, 'getByProductId').resolves(result);
      });
  
      after(() => {
        models.getByProductId.restore();
      });

      it('retorna null', async () => {
        const response = await getByProductId(id);
  
        expect(response).to.be.null;
      });
    });

    describe('Quando o produto é retornado com sucesso.', () => {
      const id = 1;

      before(async () => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getByProductId').resolves(result);
      });
  
      after(async () => {
        models.getByProductId.restore();
      });

      it('retorna um array', async () => {
        const response = await getByProductId(id);
  
        expect(response).to.be.a('array');
      });

      it ('retornado um array com o produto', async () => {
        const response = await getByProductId(id);

        expect(response).to.have.lengthOf(1);
        expect(response).to.deep.include({ id: 1, name: 'Martelo de Thor', quantity: 10 });
      });
    });
  });

  describe('Testando função que cadastra um novo produto no banco de dados.', () => {
    describe('Quando o produto já existe.', () => {
      const name = 'Martelo de Thor';
      const quantity = 10;

      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });
  
      it ('retorna um null', async () => {
        const response = await createNewProduct(name, quantity);
  
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

  describe('Testando função que atualizar um produto no banco de dados.', () => {
    describe('Quando o produto não é atualizado com sucesso', () => {
      const id = 2;
      const name = 'Martelo de Thor';
      const quantity = 10;

      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });

      it ('retorna um "null"', async () => {
        const response = await upDateProduct(id, name, quantity);

        expect(response).to.be.a('null');
        expect(response).to.be.equal(null);
      });
    });

    describe('Quando o produto é atualizado com sucesso', () => {
      const id = 1;
      const name = 'Martelo de Thor';
      const quantity = 10;

      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });

      it ('retorna um "true"', async () => {
        const response = await upDateProduct(id, name, quantity);

        expect(response).to.be.equal(true);
      });
    });
  });

  describe('Testando função que deleta um produto no banco de dados.', () => {
    describe('Quando o produto não é deletado com sucesso.', () => {
      const id = 2;

      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });

      it ('retorna um "null"', async () => {
        const response = await deleteProduct(id);

        expect(response).to.be.a('null');
        expect(response).to.be.equal(null);
      });
    });

    describe('Quando o produto é deletado com sucesso.', () => {
      const id = 1;

      before(() => {
        const result = [
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
        ];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });

      it ('retorna um "true"', async () => {
        const response = await deleteProduct(id);

        expect(response).to.be.equal(true);
      });
    });
  });
});