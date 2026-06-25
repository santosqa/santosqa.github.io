describe('Testes Funcionais — homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // ─── Título e identidade ───────────────────────────────────────────────────

  it('título da página contém o nome e a função', () => {
    cy.title().should('include', 'Ricardo Santos');
    cy.title().should('include', 'QA Engineer');
  });

  it('exibe o handle @santosqa_ na página', () => {
    cy.contains('@santosqa_').should('be.visible');
  });

  it('avatar de perfil está visível', () => {
    cy.get('img.avatar-img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'avatar.png');
  });

  // ─── Redes sociais ────────────────────────────────────────────────────────

  it('links de redes sociais têm href, target e rel corretos', () => {
    const expectedLinks = [
      { href: 'https://github.com/santosqa' },
      { href: 'https://www.linkedin.com/in/santosqa' },
      { href: 'https://www.instagram.com/santosqa_' },
      { href: 'https://www.santosqa.com' },
    ];

    cy.get('.social-nav a.social-btn').each(($link, index) => {
      cy.wrap($link)
        .should('have.attr', 'href', expectedLinks[index].href)
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer')
        .and('have.attr', 'aria-label');
    });
  });

  // ─── CTA AWS ──────────────────────────────────────────────────────────────

  it('botão principal do ebook AWS aponta para a URL correta', () => {
    cy.get('a.aws-cta-btn')
      .should('be.visible')
      .and('have.attr', 'href', 'https://ebookawsclf.pages.dev/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  it('botão do simulado gratuito AWS aponta para a URL correta', () => {
    cy.get('a.aws-sim-btn')
      .should('be.visible')
      .and('have.attr', 'href', 'https://simuladoawsclf.pages.dev/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  // ─── Lista de links ───────────────────────────────────────────────────────

  it('lista de links exibe todos os itens esperados', () => {
    const expectedLinks = [
      'https://www.santosqa.com',
      'https://www.santosqa.com/posts/',
      'https://santosqa.github.io/santos-locais-turisticos/',
      'https://santosqa.github.io/receitas/',
      'https://www.apartamentovistamar.com/',
    ];

    cy.get('.links-list a.link-card').should('have.length', expectedLinks.length);

    cy.get('.links-list a.link-card').each(($link, index) => {
      cy.wrap($link)
        .should('have.attr', 'href', expectedLinks[index])
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer')
        .and('have.attr', 'aria-label');
    });
  });

  // ─── Modal de compartilhamento ────────────────────────────────────────────

  it('modal de compartilhamento abre ao clicar no botão', () => {
    cy.disableNativeShare();
    cy.get('#share-button').click();
    cy.get('#share-modal').should('have.attr', 'aria-hidden', 'false');
    cy.get('.modal-panel').should('be.visible');
  });

  it('modal fecha ao clicar no botão fechar', () => {
    cy.disableNativeShare();
    cy.get('#share-button').click();
    cy.get('#modal-close').click();
    cy.get('#share-modal').should('have.attr', 'aria-hidden', 'true');
  });

  it('modal fecha ao pressionar Escape', () => {
    cy.disableNativeShare();
    cy.get('#share-button').click();
    cy.get('#share-modal').should('have.attr', 'aria-hidden', 'false');
    cy.get('body').type('{esc}');
    cy.get('#share-modal').should('have.attr', 'aria-hidden', 'true');
  });

  it('links do modal de compartilhamento têm href e aria-label preenchidos', () => {
    cy.disableNativeShare();
    cy.get('#share-button').click();
    cy.get('.modal-panel a.share-item').each(($link) => {
      cy.wrap($link)
        .should('have.attr', 'aria-label')
        .and('not.be.empty');
      cy.wrap($link)
        .invoke('attr', 'href')
        .should('not.eq', '#');
    });
  });

  // ─── Footer ───────────────────────────────────────────────────────────────

  it('footer exibe o crédito e link para santosqa.com', () => {
    cy.get('footer')
      .should('contain', 'Feito com')
      .find('a')
      .should('have.attr', 'href', 'https://santosqa.com')
      .and('contain', '@santosqa_');
  });
});
