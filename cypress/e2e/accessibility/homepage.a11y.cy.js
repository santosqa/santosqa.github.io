describe('Testes de Acessibilidade — homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // ─── Estrutura semântica ──────────────────────────────────────────────────

  it('h1 exibe o nome do perfil corretamente', () => {
    cy.get('h1.profile-name')
      .should('exist')
      .and('contain', 'Ricardo Santos');
  });

  it('skip link está presente e aponta para o conteúdo principal', () => {
    cy.get('a.skip-link')
      .should('exist')
      .and('have.attr', 'href', '#main-content');
  });

  it('conteúdo principal tem id="main-content"', () => {
    cy.get('#main-content').should('exist');
  });

  it('header tem role="banner"', () => {
    cy.get('header[role="banner"]').should('exist');
  });

  it('main tem role="main"', () => {
    cy.get('main[role="main"]').should('exist');
  });

  it('footer tem role="contentinfo"', () => {
    cy.get('footer[role="contentinfo"]').should('exist');
  });

  // ─── Imagens ──────────────────────────────────────────────────────────────

  it('todas as imagens têm atributo alt', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt');
    });
  });

  it('avatar tem alt descritivo (não vazio)', () => {
    cy.get('img.avatar-img')
      .should('have.attr', 'alt')
      .and('not.be.empty');
  });

  // ─── Botões e links ───────────────────────────────────────────────────────

  it('todos os links de redes sociais têm aria-label', () => {
    cy.get('.social-nav a.social-btn').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label').and('not.be.empty');
    });
  });

  it('botão de compartilhar tem aria-label', () => {
    cy.get('#share-button')
      .should('have.attr', 'aria-label')
      .and('not.be.empty');
  });

  it('todos os links da lista principal têm aria-label', () => {
    cy.get('.links-list a.link-card').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label').and('not.be.empty');
    });
  });

  it('botão do ebook AWS tem aria-label', () => {
    cy.get('a.aws-cta-btn')
      .should('have.attr', 'aria-label')
      .and('not.be.empty');
  });

  it('botão do simulado AWS tem aria-label', () => {
    cy.get('a.aws-sim-btn')
      .should('have.attr', 'aria-label')
      .and('not.be.empty');
  });

  // ─── Modal ────────────────────────────────────────────────────────────────

  it('modal de compartilhamento tem role="dialog", aria-modal e aria-labelledby', () => {
    cy.get('#share-modal')
      .should('have.attr', 'role', 'dialog')
      .and('have.attr', 'aria-modal', 'true')
      .and('have.attr', 'aria-labelledby', 'modal-title');
  });

  it('modal começa com aria-hidden="true"', () => {
    cy.get('#share-modal').should('have.attr', 'aria-hidden', 'true');
  });

  it('botão fechar do modal tem aria-label', () => {
    cy.get('#modal-close')
      .should('have.attr', 'aria-label')
      .and('not.be.empty');
  });

  it('itens de compartilhamento no modal têm aria-label', () => {
    cy.get('.modal-panel a.share-item').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label').and('not.be.empty');
    });
  });

  // ─── Navegação e seções ───────────────────────────────────────────────────

  it('nav de redes sociais tem aria-label', () => {
    cy.get('nav.social-nav')
      .should('have.attr', 'aria-label')
      .and('not.be.empty');
  });

  it('nav da lista de links tem aria-label', () => {
    cy.get('nav[aria-label]').should('have.length.gte', 2);
  });

  it('seção AWS tem aria-labelledby', () => {
    cy.get('.aws-section')
      .should('have.attr', 'aria-labelledby', 'aws-heading');
    cy.get('#aws-heading').should('exist');
  });
});
