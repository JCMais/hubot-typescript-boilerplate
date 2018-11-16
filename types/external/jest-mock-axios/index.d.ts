declare module 'jest-mock-axios' {
  interface MockAxios {
    reset: () => void;
    mockResponse: () => void;
    get: () => void;
    post: () => void;
  }

  const mockAxios: MockAxios;

  export = mockAxios;
}
