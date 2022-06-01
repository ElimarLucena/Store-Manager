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
            saleI_d: 1,
            date: "2022-06-01T13:34:09.000Z",
            product_Id: 1,
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
        expect(response[0]).to.be.property('date');
      });
    });
  });
});