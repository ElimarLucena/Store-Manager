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
  // describe('Testando função que retorna todos os produtos cadastrados no banco de dados', () => {
  //   const allProducts = [
  //     {
  //       "id": 1,
  //       "name": "Martelo de Thor",
  //       "quantity": 10
  //     },
  //     {
  //       "id": 2,
  //       "name": "Traje de encolhimento",
  //       "quantity": 20
  //     },
  //     {
  //       "id": 3,
  //       "name": "Escudo do Capitão América",
  //       "quantity": 30
  //     }
  //   ]
  //   before(async () => {
  //     sinon.stub(connection, 'execute').resolves(allProducts);
  //   });

  //   after(async () => {
  //     connection.execute.restore();
  //   });

  //   it('retorna um array com todos os produtos', async () => {
  //     const response = await getAll(allProducts);

  //     expect(response).to.be.a('array');
  //     expect(response).to.have.lengthOf(3);
  //     expect(response).to.deep.include(allProducts[0]);
  //   });
  // });

  describe('Testando função que cadastra um novo produto no banco de dados.', () => {
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

    describe('Quando é inserido com sucesso.', () => {
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