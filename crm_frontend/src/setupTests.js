/* Global Jest setup */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

 // Ensure all tests use the manual mock for API under src/services/__mocks__/api.js
 // This makes all API methods Promise-based and avoids undefined.then errors across tests.
 jest.mock('./services/api');
