const sinon = require('sinon');
const { expect } = require('chai');

const services = require('../../../services/salesService');
const {
  getAll,
  getBySaleId,
  createNewSales,
  upDateSale,
} = require('../../../controllers/salesController');

describe('Teste da camada Controllers relacionada ao Vendas.', () => {
  describe('Testando função que retorna todas as vendas cadastrados no banco de dados', () => {
    describe('Quando a buscar pelas vendas tem sucesso.', () => {
      const req = {};
  
      const res = {};

      before(() => {
        const result = [
          {
            saleId: 1,
            date: "2022-06-01T13:34:09.000Z",
            productId: 1,
            quantity: 5
          },
          {
            saleId: 1,
            date: "2022-06-01T23:15:16.000Z",
            productId: 2,
            quantity: 10
          },
          {
            saleId: 2,
            date: "2022-06-01T23:15:16.000Z",
            productId: 3,
            quantity: 15
          }
        ];
        sinon.stub(services, 'getAll').resolves(result);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(result);
      });

      after(() => {
        services.getAll.restore();
      });

      it ('retorna um array', async () => {
        await getAll(req, res);
  
        expect(res.json()).to.be.a('array');
        expect(res.json()).to.be.lengthOf(3);
        expect(res.json()).to.deep.include( {
          saleId: 2,
          date: "2022-06-01T23:15:16.000Z",
          productId: 3,
          quantity: 15
        });
      });
    });
  });
});

