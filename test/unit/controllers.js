const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController');
const productService = require('../../services/productService');
const { validateName, validateQuantity } = require('../../middlewares/validationsProduct');
const res = require('express/lib/response');

describe('Busca todos os produtos através da API (controllers/productController/getAllProducts)', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves([]);

      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('retorna o status 200', async () => {
      await productController.getAllProducts(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('retorna um JSON com um array', async () => {
      await productController.getAllProducts(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('Quando existe algum produto cadastrado', () => {
    const fakeReq = {};
    const fakeRes = {};

    before(() => {
      sinon.stub(productService, 'getAllProducts').resolves([
        {
          id: 1,
          name: 'Fralda',
          quantity: 20
        },
      ]);

      fakeReq.body = {};
      fakeRes.status = sinon.stub().returns(fakeRes);
      fakeRes.json = sinon.stub().returns();
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('retorna o status 200', async () => {
      await productController.getAllProducts(fakeReq, fakeRes);

      expect(fakeRes.status.calledWith(200)).to.be.true;
    });

    it('retorna um array em formato JSON', async () => {
      await movieController.getAllProducts(fakeReq, fakeRes);

      expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('o array contém um produto', async () => {
      await movieController.getAllProducts(fakeReq, fakeRes);

      const thirdCallArguments = fakeRes.json.args[2];
      const firstArgument = thirdCallArguments[0];
      const product = firstArgument[0];

      expect(product).to.be.an('object');
    });
  });
});

describe('validaçao do name', () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      quantity: 30
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"name" is required' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se name não existir, retorna status status 400', async () => {
    await validateName(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(400)).to.be.true;
  })

})

describe('segunda validação de name', async () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      name: 'fra',
      quantity: 30
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"name" length must be at least 5 characters long' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se o tamanho dos caracteres de name for menor que 5, retorna status 422', async () => {
    await validateName(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(422)).to.be.true;
  })
})

describe('validação de quantity', async () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      name: 'fralda',
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"quantity" is required' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se não existir "quantity", retorna status 400', async () => {
    await validateQuantity(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(400)).to.be.true;
  })
})

describe('segunda validação de quantity', async () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      name: 'fralda',
      quantity: -1
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"quantity" must be a number larger than or equal to 1' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se "quantity" for negativo, retorna status 422', async () => {
    await validateQuantity(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(422)).to.be.true;
  })
})

describe('terceira validação de quantity', async () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      name: 'fralda',
      quantity: 0
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"quantity" must be a number larger than or equal to 1' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se "quantity" for igual a 0, retorna status 422', async () => {
    await validateQuantity(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(422)).to.be.true;
  })
})

describe('quarta validação de quantity', async () => {
  const fakeReq = {};
  const fakeRes = {};
  const next = () => { };
  before(() => {
    sinon.stub(productService, 'createProduct').resolves()

    fakeReq.body = {
      name: 'fralda',
      quantity: 'String'
    };
    fakeRes.status = sinon.stub().returns(fakeRes);
    fakeRes.json = sinon.stub().returns({ message: '"quantity" must be a number larger than or equal to 1' });
  });

  after(() => {
    productService.createProduct.restore();
  });

  it('se "quantity" for inserido uma string, retorna status 422', async () => {
    await validateQuantity(fakeReq, fakeRes, next);
    expect(fakeRes.status.calledWith(422)).to.be.true;
  })
})

describe('Ao chamar o controller de create apos a suas validações', () => {
  describe('é inserido com sucesso', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Fralda',
        quantity: 20
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(true);
    });

    after(() => {
      productService.createProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o JSON com o retorno dos valores inseridos"', async () => {
      const items = {
        name: 'Fralda',
        quantity: 20
      };
      await productController.createProduct(request, response);

      expect(response.json.calledWith(items)).to.be.equal(
        true
      );
    });
  });
});