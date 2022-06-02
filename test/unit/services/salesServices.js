const sinon = require('sinon');
const { expect } = require('chai');

const models = require('../../../models/salesModel');
const { 
  getAll, 
  getBySaleId, 
  createNewSales,
  upDateSale,
} = require('../../../services/salesService');

describe('Teste da camada Service relacionada ao Vendas.', () => {
  describe('Testando função que retorna todas as vendas cadastrados no banco de dados', () => {
    describe('Quando a buscar pelas vendas não tem sucesso.', () => {
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

    describe('Quando a buscar pelas vendas tem sucesso.', () => {
      before(() => {
        const result = [{
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 1,
            quantity: 5
          }];

        sinon.stub(models, 'getAll').resolves(result);
      });
  
      after(() => {
        models.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await getAll();
  
        expect(response).to.be.a('array');
      });

      it('retorna um array com todos as vendas.', async () => {
        const response = await getAll();

        expect(response).to.have.lengthOf(1);
      });
    });
  });

  describe('estando função que retorna uma venda de acordo com seu número de "id".', () => {
    describe('Quando a venda não é retornada com sucesso.', () => {
      const id = 1;
      
      before(() => {
        const execute = [];

        sinon.stub(models, 'getBySaleId').resolves(execute);
      });
  
      after(() => {
        models.getBySaleId.restore();
      });

      it ('retornado um "null"', async () => {
        const response = await getBySaleId(id);

        expect(response).to.be.a('null');
        expect(response).to.be.null;
      });
    });

    describe('Quando a buscar pelas vendas tem sucesso.', () => {
      const id = 1;

      before(() => {
        const result = [{
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 1,
            quantity: 5
          }];

        sinon.stub(models, 'getBySaleId').resolves(result);
      });

      after(() => {
        models.getBySaleId.restore();
      });

      it('retorna um array', async () => {
        const response = await getBySaleId(id);

        expect(response).to.be.a('array');
      });

      it ('retornado um array com o produto', async () => {
        const response = await getBySaleId(id);

        expect(response).to.have.lengthOf(1);
      });
    });
  });

  describe('Testando função inseri uma nova venda no banco de dados.', () => {
    describe('Quando a venda é inserida com sucesso.', () => {
      const objSale =  [
        {
          "productId": 1,
          "quantity": 3
        }
      ];

      before(() => {
        const resultId = { insertId: 1 };

        sinon.stub(models, 'insertTableSales').resolves(resultId);
        sinon.stub(models, 'insertTableSalesProducts').resolves(resultId);
      });

      after(() => {
        models.insertTableSales.restore();
        models.insertTableSalesProducts.restore();
      });
      
      it('retorna um object', async () => {
        const response = await createNewSales(objSale);
  
        expect(response).to.be.a('object');
      });

      it('retorna um object com venda correspondente.', async () => {
        const response = await createNewSales(objSale);

        expect(response).to.have.property('id');
        expect(response).to.have.property('itemsSold');
      });
    });
  });

  describe('Testando função que atualizar uma venda no bando de dados.', () => {
    describe('Quando a venda não é atualizada com sucesso.', () => {
      const id = 2;
      const productId = 4;
      const quantity = 5;

      before(() => {
        const result = [{
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 1,
            quantity: 5
          }];

        sinon.stub(models, 'getAll').resolves(result);
      });

      after(() => {
        models.getAll.restore();
      });

      it ('retorna um "null"', async () => {
        const response = await upDateSale(id, productId, quantity);

        expect(response).to.be.a('null');
        expect(response).to.be.null;
      });
    });

    describe('Quando a venda é atualizada com sucesso.', () => {
      const id = 1;
      const productId = 4;
      const quantity = 5;

      before(() => {
        const result = [
          {
            sale_Id: 1,
            date: "2022-06-01T13:34:09.000Z",
            product_Id: 1,
            quantity: 5
          },
          {
            sale_Id: 1,
            date: "2022-06-01T23:15:16.000Z",
            product_Id: 2,
            quantity: 10
          },
          {
            sale_Id: 2,
            date: "2022-06-01T23:15:16.000Z",
            product_Id: 3,
            quantity: 15
          }
        ];

        sinon.stub(models, 'getAll').resolves(result);
        sinon.stub(models, 'upDateTableSales').resolves();
        sinon.stub(models, 'upDateTableSalesProducts').resolves();
      });

      after(() => {
        models.getAll.restore();
        models.upDateTableSales.restore();
        models.upDateTableSalesProducts.restore();
      });

      it('retorna um object', async () => {
        const response = await upDateSale(id, productId, quantity);

        expect(response).to.be.a('object');
      });

      it('retorna um object com venda correspondente.', async () => {
        const response = await upDateSale(id, productId, quantity);

        expect(response).to.have.property('saleId');
        expect(response).to.have.property('itemUpdated');
      });
    });
  });
});
