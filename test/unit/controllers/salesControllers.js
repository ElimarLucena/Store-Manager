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

  describe('Testando função que retorna uma venda de acordo com seu número de "id".', () => {
    describe('Quando a venda não é retornada com sucesso.', () => {
      const req = {};
  
      const res = {};

      before(() => {
        req.params = 1;

        sinon.stub(services, 'getBySaleId').resolves(null);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Sale not found' });
      });

      after(() => {
        services.getBySaleId.restore();
      });

      it ('status retornado com o código 404', async () => {
        await getBySaleId(req, res);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it ('retorna um objeto', async () => {
        await getBySaleId(req, res);
  
        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('message');
        expect(res.json()).to.include({ message: 'Sale not found' });
      });
    });

    describe('Quando a buscar pelas vendas tem sucesso.', () => {
      const req = {};
  
      const res = {};

      before(() => {
        req.params = 1;

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

        sinon.stub(services, 'getBySaleId').resolves(result);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(result);
      });

      after(() => {
        services.getBySaleId.restore();
      });

      it ('status retornado com o código 200', async () => {
        await getBySaleId(req, res);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it ('retorna um array', async () => {
        await getBySaleId(req, res);
  
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

  describe('Testando função inseri uma nova venda no banco de dados.', () => {
    describe('Quando a venda é inserida com sucesso.', () => {
      const req = {};

      const res = {};

      before(() => {
        req.body = [ { productId: 1, quantity: 3 } ];

        const result =  {
          id: 1,
          itemsSold: [
            {
              productId: 1,
              quantity: 3
            }
          ]
        };

        sinon.stub(services, 'createNewSales').resolves(result);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(result);
      });

      after(() => {
        services.createNewSales.restore();
      });

      it ('retorna um "object"', async () => {
        await createNewSales(req, res);

        expect(res.json()).to.be.a('object');
        expect(res.json()).to.be.property('id');
      });
    });
  });

  describe('Testando função que atualizar uma venda no bando de dados.', () => {
    describe('Quando a venda não é atualizada com sucesso.', () => {
      const req = {};

      const res = {};

      before(() => {
        req.params = 1;
        req.body =  [
          {
            productId: 1,
            quantity: 6
          }
        ]

        sinon.stub(services, 'upDateSale').resolves(null);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns({ message: 'Product not found' });
      });

      after(() => {
        services.upDateSale.restore();
      });

      it ('retorna o status 404', async () => {
        await upDateSale(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it ('retorna uma messagem de error.', async () => {
        await upDateSale(req, res);

        expect(res.json()).to.be.include({ message: 'Product not found' });
      });
    });

    describe('Quando a venda é atualizada com sucesso.', () => {
      const req = {};

      const res = {};

      const updateObj = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 6
          },
        ],
      };

      before(() => {
        req.params = 1;
        req.body =  [
          {
            productId: 1,
            quantity: 6
          }
        ]

        sinon.stub(services, 'upDateSale').resolves(updateObj);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(updateObj);
      });

      after(() => {
        services.upDateSale.restore();
      });

      it ('retorna o status 200', async () => {
        await upDateSale(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it ('retorna uma messagem de error.', async () => {
        await upDateSale(req, res);

        expect(res.json()).to.be.property('saleId');
        expect(res.json()).to.be.a('object');
      });
    })
  });
});

