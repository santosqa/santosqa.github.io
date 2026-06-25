// Desativa navigator.share para forçar o fallback do modal em todos os testes
Cypress.Commands.add('disableNativeShare', () => {
  cy.window().then((win) => {
    Object.defineProperty(win.navigator, 'share', {
      value: undefined,
      writable: true,
    });
  });
});
