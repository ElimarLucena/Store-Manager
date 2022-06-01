const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../dbConnection/connection');
const { 
  getAll, 
  getBySaleId, 
  insertTableSales,
  insertTableSalesProducts,
  upDateTableSales,
  upDateTableSalesProducts,
} = require('../../../models/salesModel');
const { execute } = require('../../../dbConnection/connection');

describe('Teste da camada Model relacionada ao Vendas.', () => {
  describe('Testando função que retorna todas as vendas cadastrados no banco de dados', () => {
    describe('Quando a buscar pelas vendas não tem sucesso.', () => {
      before(() => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
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

    describe('Quando a buscar pelas vendas tem sucesso.', () => {
      before(() => {
        const execute = [[
          {
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 1,
            quantity: 5
          },
          {
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 2,
            quantity: 10
          },
          {
            saleId: 2,
            date: "2022-06-01T13:34:09.000Z",
            productId: 3,
            quantity: 15
          }
        ]];

        sinon.stub(connection, 'execute').resolves(execute);
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

  describe('Testando função que retorna uma venda de acordo com seu número de "id".', () => {
    describe('Quando a venda não é retornada com sucesso.', () => {
      const id = 1;
      
      before(() => {
        const execute = [[]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it ('retornado um array', async () => {
        const response = await getBySaleId(id);

        expect(response).to.be.a('array');
      });

      it ('retornado um array vazio', async () => {
        const response = await getBySaleId(id);

        expect(response).to.be.empty;
      });
    });

    describe('Quando a venda é retornado com sucesso.', () => {
      const id = 1;
      
      before(() => {
        const execute = [[{ id: 1, name: 'Martelo de Thor', quantity: 10 }]];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it ('retornado um array', async () => {
        const response = await getBySaleId(id);

        expect(response).to.be.a('array');
      });

      it ('retornado um array com o produto', async () => {
        const response = await getBySaleId(id);

        expect(response).to.have.lengthOf(1);
        expect(response).to.deep.include({ id: 1, name: 'Martelo de Thor', quantity: 10 });
      });
    });
  });

  describe('Testando função que inseri a data que foi feita a venda.', () => {
    describe('Quabdo a data não é inserida com sucesso.', () => {
      before(() => {
        const execute = [{}];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await insertTableSales();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object vazio', async () => {
        const response = await insertTableSales();

        expect(response).to.have.empty;
      });
    });

    describe('Quando a data é inserida com secesso.', () => {
      before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await insertTableSales();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object com o "id" da venda correspondente.', async () => {
        const response = await insertTableSales();

        expect(response).to.have.property('insertId');
      });
    });
  });

  describe('Testando função inseri uma nova venda no banco de dados.', () => {
    describe('Quando a venda não é inserida com sucesso.', () => {
      before(() => {
        const execute = [{}];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await insertTableSalesProducts();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object vazio', async () => {
        const response = await insertTableSalesProducts();

        expect(response).to.have.empty;
      });
    });

    describe('Quando a venda é inserida com sucesso.', () => {
      before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await insertTableSalesProducts();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object com o "id" da venda correspondente.', async () => {
        const response = await insertTableSalesProducts();

        expect(response).to.have.property('insertId');
      });
    });
  });

  describe('Testando função que atualizar a data que foi feita a venda.', () => {
    describe('Quando a data da venda não é atualizada com sucesso.', () => {
      before(() => {
        const execute = [{}];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await upDateTableSales();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object vazio', async () => {
        const response = await upDateTableSales();

        expect(response).to.have.empty;
      });
    });

    describe('Quando a data da venda é atualizada com sucesso.', () => {
      before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await upDateTableSales();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object com o "id" da venda atualizada.', async () => {
        const response = await upDateTableSales();

        expect(response).to.have.property('insertId');
      });
    });
  });

  describe('Testando função que atualizar uma venda no bando de dados.', () => {
    describe('Quando a venda não é atualizada com sucesso.', () => {
      before(() => {
        const execute = [{}];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await upDateTableSalesProducts();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object vazio', async () => {
        const response = await upDateTableSalesProducts();

        expect(response).to.have.empty;
      });
    });

    describe('Quando a venda é atualizada com sucesso.', () => {
      before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um object', async () => {
        const response = await upDateTableSalesProducts();
  
        expect(response).to.be.a('object');
      });

      it('retorna um object com o "id" da venda atualizada.', async () => {
        const response = await upDateTableSalesProducts();

        expect(response).to.have.property('insertId');
      });
    });
  });
})
