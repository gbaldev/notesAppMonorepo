const mockAsyncStorage = {
  getItem: jest.fn(key => {
    return Promise.resolve(null);
  }),
  setItem: jest.fn((key, value) => {
    return Promise.resolve();
  }),
  removeItem: jest.fn(key => {
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    return Promise.resolve();
  }),
};

export default mockAsyncStorage;
