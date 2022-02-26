const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController');
const productService = require('../../services/productService');
const salesService = require('../../services/salesService');
const salesController = require('../../controllers/salesController');

const serviceResponse = { code: 200, data: 'alguma coisa' };

describe('Busca todos os produtos através da API (controllers/productController/getAll)', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves(serviceResponse);

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
      expect(res.json.calledWith(serviceResponse.data)).to.be.true;
    });
  });

  describe('Quando existe algum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves(serviceResponse)

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

      expect(res.json.calledWith(serviceResponse.data)).to.be.true;
    });

  });
});

describe('Busca todos os produtos vendidos através da API (controllers/salesController/getAll)', () => {
  describe('Quando não existe nenhum produto vendido cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAllSales').resolves(serviceResponse);

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

    it('retorna um array vazio em formato JSON', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(serviceResponse.data)).to.be.true;
    });
  });

  describe('Quando existe algum produto vendido', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAllSales').resolves(serviceResponse)

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

      expect(res.json.calledWith(serviceResponse.data)).to.be.true;
    });
  });
});
