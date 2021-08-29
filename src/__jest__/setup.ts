jest.mock('../common/redis', () => ({
  mSet: jest.fn(),
  mGet: jest.fn()
}));

jest.mock('@dk/module-kafka', () => ({
  kafkaProducer: {
    init: jest.fn(() => ({
      sendSerializedValue: jest.fn(),
      connect: jest.fn()
    }))
  }
}));
