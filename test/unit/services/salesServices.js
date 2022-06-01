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
});
