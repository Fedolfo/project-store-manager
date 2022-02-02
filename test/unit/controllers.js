const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController');
const productService = require('../../services/productService');
const salesService = require('../../services/salesService');
const salesController = require('../../controllers/salesController');

describe('Busca todos os produtos através da API (controllers/productController/getAll)', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves([]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('retorna o status 200', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um JSON com um array', async () => {
      await productController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('Quando existe algum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves([
        {
          id: 1,
          name: 'Fralda',
          quantity: 20
        },
      ]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('retorna o status 200', async () => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um array em formato JSON', async () => {
      await productController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('o array contém um produto', async () => {
      await productController.getAll(req, res);

      const thirdCallArguments = res.json.args[2];
      const firstArgument = thirdCallArguments[0];
      const product = firstArgument[0];

      expect(product).to.be.an('object');
    });
  });
});

describe('Busca todos os produtos vendidos através da API (controllers/salesController/getAll)', () => {
  describe('Quando não existe nenhum produto vendido cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAllSales').resolves([]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesService.getlAllSales.restore();
    });

    it('retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um JSON com um array', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('Quando existe algum produto vendido', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAllSales').resolves([
        {
          sale_id: 1,
          product_id: 1,
          quantity: 20
        },
      ]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesService.getlAllSales.restore();
    });

    it('retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um array em formato JSON', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('o array contém um produto', async () => {
      await salesController.getAll(req, res);

      const thirdCallArguments = res.json.args[2];
      const firstArgument = thirdCallArguments[0];
      const product = firstArgument[0];

      expect(product).to.be.an('object');
    });
  });
});

// describe('Cria produtos através da API (controllers/productController/create)', () => {
//   describe('quando é inserido com sucesso', async () => {
//     const res = {};
//     const req = {};

//     before(async () => {
//       req.body = {
//         name: 'Fralda',
//         quantity: 20
//       };

//       res.status = sinon.stub().returns(res);
//       res.send = sinon.stub().returns();

//       sinon.stub(productService, 'createProduct').resolves(true);
//     });

//     after(() => {
//       productService.createProduct.restore();
//     });

//     it('é chamado o status com o código 201', async () => {
//       await productController.create(req, res);

//       expect(res.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o JSON com o retorno dos valores inseridos"', async () => {
//       const items = {
//         name: 'Fralda',
//         quantity: 20
//       };
//       await productController.create(req, res);

//       expect(res.json.calledWith(items)).to.be.equal(
//         true
//       );
//     });
//   });
// });
