const mockNetInfo = {
  fetch: jest.fn(() => Promise.resolve({isConnected: true})),
  addEventListener: jest.fn(),
};

export default mockNetInfo;
