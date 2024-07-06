describe('Testes Funcionais da Página', () => {
  beforeEach(() => {
    cy.visit('https://santosqa.github.io/'); // Atualize com o caminho correto do seu arquivo HTML
  });

  it('Verifica o título da página', () => {
    cy.title().should('eq', 'Links Santos QA');
  });

  it('Verifica se o texto "@santosqa_" está presente na página', () => {
    cy.contains('@santosqa_').should('exist');
  });

  it('Verifica se todas as fotos de perfil estão carregadas', () => {
    cy.get('#profile img').should('be.visible');
  });

  it('Verifica o funcionamento do botão de alternar tema', () => {
    // Testa se o tema inicial é "dark"
    cy.get('html').should('have.class', 'dark');

    // Clica no botão de alternar tema
    cy.get('#switch button').click();

    // Testa se o tema foi alterado para "light"
    cy.get('html').should('have.class', 'light');
  });

  it('Verifica se todos os itens da lista de redes sociais têm atributos corretos', () => {
    const socialLinks = [
      { name: 'logo-wordpress', href: 'https://www.santosqa.com' },
      { name: 'logo-github', href: 'https://github.com/santosqa' },
      { name: 'logo-linkedin', href: 'https://www.linkedin.com/in/santosqa' },
      { name: 'logo-instagram', href: 'https://www.instagram.com/santosqa_' },
      { name: 'logo-whatsapp', href: '#' },
      { name: 'globe-outline', href: 'https://www.apartamentovistamar.com/' },
    ];

    cy.get('#social-links a').not('#share-button').each(($link, index) => {
      const { name, href } = socialLinks[index];
      cy.wrap($link)
        .should('have.attr', 'href', href)
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer')
        .should('have.attr', 'aria-label')
    });
  });

  it('Verifica o texto e URL de redirecionamento no footer', () => {
    cy.get('footer p')
      .should('contain', 'Feito com ❤ por')
      .find('a')
      .should('have.attr', 'href', 'https://santosqa.com')
      .and('contain', '@santosqa_');
  });
  

});
