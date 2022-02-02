const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productService = require('../../services/productService');
const productModel = require('../../models/productModel');

describe('Busca todos os produtos do banco (services/productService/getAllProducts)', () => {
  describe('Quando não existir nenhum produto cadastrado', () => {
    before(() => {
      sinon.stub(productModel, 'getAllProducts').resolves([]);
    });

    after(() => {
      productModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const result = await productService.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productService.getAllProducts();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existe algum produto cadastrado', () => {
    before(() => {
      sinon.stub(productModel, 'getAllProducts').resolves([
        {
          id: 1,
          name: 'Fralda',
          quantity: 10,
        },
      ]);
    });

    after(() => {
      productModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await productService.getAllProducts();

      expect(response).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const response = await productService.getAllProducts();

      expect(response).to.be.not.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [item] = await productService.getAllProducts();

      expect(item).to.be.an('object');
    });

    it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
      const [item] = await productService.getAllProducts();

      expect(item).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Cria um novo produto (services/productService/create)', () => {
  describe('quando e inserido um produto retorna', () => {
    const payloadProduct = {
      name: 'Fralda',
      quantity: 20
    };

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', async () => {
      it('retorna um objeto', async () => {
        const response = await productService.createProduct(payloadProduct);

        expect(response).to.be.a('object');
      });

      it('tal objeto possui o "id" do novo produto inserido', async () => {
        const response = await productService.createProduct(payloadProduct);

        expect(response).to.have.a.property('id');
      });
    });
  });
})