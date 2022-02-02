const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productModel = require('../../models/productModel');

describe('Busca todos produtos do banco (models/productModels/getAll)', () => {
  describe('Quando não existir nenhum produto cadastrado', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productModel.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productModel.getAllProducts();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existir pelo menos um produto cadastrado', () => {
    before(async () => {
      const product = {
        id: 1,
        name: 'Fralda',
        quantity: 20,
      };

      sinon.stub(connection, 'execute').resolves([[product]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productModel.getAllProducts();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await productModel.getAllProducts();

      expect(result).to.not.be.empty;
    });

    it('todos os itens do array têm o tipo "objeto"', async () => {
      const result = await productModel.getAllProducts();

      result.map((item) => {
        expect(item).to.be.an('object');
      });
    });

    it('os itens possuem as propriedades "id", "name", "quantity"', async () => {
      const result = await productModel.getAllProducts();

      result.map((item) => {
        expect(item).to.include.all.keys(
          'id',
          'name',
          'quantity'
        );
      });
    });
  });
});

describe('Cria um novo produto (models/productModels/create)', () => {
  describe('retorna o produto registrado', () => {

    before(async () => {
      const payloadProduct = {
        name: 'Fralda',
        quantity: 20
      };

      sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', async () => {
      it('retorna um objeto', async () => {
        const response = await productModel.create();

        expect(response).to.be.a('object');
      });

      it('tal objeto possui o "id","name" e "quantitiy"', async () => {
        const response = await productModel.create();
        expect(response).to.include.all.keys(
          'id',
          'name',
          'quantity'
        );
      });
    });
  });
})

describe('E chamado (models/productModels/getById)', () => {
  describe('quando e inserido um id', () => {
    before(async () => {
      const payloadProduct = {
        id: 1,
        name: 'Fralda',
        quantity: 20
      };

      sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
    })
  })
  after(() => {
    connection.execute.restore();
  });

  it('retorna um objeto', async () => {
    await productModel.create();
    const response = await productModel.getById(1);

    expect(response).to.be.a('object');
  });

  it('o objeto não está vazio', () => {
    const response = await productModel.getById(1);
    expect(response).to.be.not.empty;
  })

  it('tal objeto possui o "id","name" e "quantitiy"', async () => {
    const response = await productModel.getById(1);

    expect(response).to.include.all.keys(
      'id',
      'name',
      'quantity'
    );
  });
})

describe('E chamado (models/productModels/update)', () => {
  describe('quando atualiza um produto', () => {
    before(async () => {
      const execute = { insertId: 1 }
      sinon.stub(connection, 'execute').resolves([execute])
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productModel.update(1, 'mir4', 30);
      expect(response).to.be.a('object');
    })

    it('tal objeto possui o "id","name" e "quantitiy"', async () => {
      const response = await productModel.update(1, 'mir4', 30);
      expect(response).to.include.all.keys(
        'id',
        'name',
        'quantity'
      );
    })
  })
})