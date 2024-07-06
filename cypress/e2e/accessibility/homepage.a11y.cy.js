describe('Testes de Acessibilidade', () => {
  beforeEach(() => {
    cy.visit('https://santosqa.github.io/'); // Substitua pelo caminho correto do seu arquivo HTML
  });

  it('Verifica se os elementos têm atributos de acessibilidade adequados', () => {
    // Verifica se o título principal está presente, visível e tem o texto correto
    cy.get('h1.visually-hidden').should('exist').should('be.visible').and('have.text', 'Links Santos QA');

    // Verifica se o botão de alternar tema possui um atributo aria-label
    cy.get('#switch button').should('have.attr', 'aria-label', 'Alternar tema');

    // Verifica se os links sociais possuem atributo aria-label
    cy.get('#social-links a').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label');
    });

    // Verifica se as imagens têm atributo alt
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt');
    });

    // Verifica se os botões dentro do modal de compartilhamento têm atributo aria-label ou texto acessível
    cy.get('#share-modal button.close-button').should('have.attr', 'aria-label', 'Fechar modal');

    // Verifica se os links de compartilhamento dentro do modal possuem atributo aria-label
    cy.get('#fallback-share-options a').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label');
    });

    // Verifica se os links da lista de redes sociais têm atributo aria-label
    cy.get('#links-list a').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label');
    });
  });

  
});
