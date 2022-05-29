const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../dbConnection/connection');
const { 
  getAll, 
  getByProductId, 
  createNewProduct,
  upDateProduct,
  deleteProduct,
} = require('../../../models/productsModel');

describe('Teste da camada Model relacionada ao produto.', () => {
  describe('Testando função que retorna todos os produtos cadastrados no banco de dados', () => {
    describe('Quando a buscar pelos produtos não tem sucesso.', () => {
      before(async () => {
        const result = [[]];

        sinon.stub(connection, 'execute').resolves(result);
      });
  
      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const response = await getAll();
  
        expect(response).to.be.a('array');
      });

      it('retorna um array vazio', async () => {
        const response = await getAll();

        expect(response).to.have.lengthOf(0);
      });
    });

    describe('Quando a buscar pelos produtos tem sucesso.', () => {
      before(() => {
        const result = [[
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
          { id: 2, name: 'Traje de encolhimento', quantity: 20 },
          { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
        ]];

        sinon.stub(connection, 'execute').resolves(result);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const response = await getAll();
  
        expect(response).to.be.a('array');
      });

      it('retorna um array com todos os produtos', async () => {
        const response = await getAll();

        expect(response).to.have.lengthOf(3);
      });
    });
  });

  describe('Testando função que cadastra um novo produto no banco de dados.', () => {
    describe('Quando é inserido com sucesso.', () => {
      const insertObject = {
        name: "Martelo de Thor",
        quantity: 10
      };
  
      before(() => {
        const execute = [{ insertId: 1 }];
  
        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it ('retornado um objeto', async () => {
        const response = await createNewProduct(insertObject);

        expect(response).to.be.a('object');
      });

      it ('objeto contém o "id" do novo produto inserido', async () => {
        const response = await createNewProduct(insertObject);

        expect(response).to.have.property('insertId');
      });
    });
  });
});