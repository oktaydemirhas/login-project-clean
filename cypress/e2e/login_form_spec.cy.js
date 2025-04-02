describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('a) Başarılı form doldurulduğunda success sayfası açılabiliyor', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('Password123');
    cy.get('input[type="checkbox"]').check();
    cy.get('[data-testid="submit-button"]').should('not.be.disabled').click();
    cy.url().should('include', '/success');
    cy.contains('Giriş Başarılı');
  });

  it('b) Sadece email yanlış → 1 hata mesajı, doğru mesaj, buton disabled', () => {
    cy.get('input[type="email"]').type('yanlışmail');
    cy.get('p').should('contain', 'Geçerli bir email giriniz.');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('c) Email ve şifre yanlış → 2 hata mesajı, doğru içerikler, buton disabled', () => {
    cy.get('input[type="email"]').type('x');
    cy.get('input[type="password"]').type('abc');
    cy.get('p').should('contain', 'Geçerli bir email giriniz.');
    cy.get('p').should('contain', 'Şifre en az 8 karakter');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('d) Email ve şifre doğru ama şartlar işaretli değil → buton disabled', () => {
    cy.get('input[type="email"]').type('doğru@mail.com');
    cy.get('input[type="password"]').type('Password123');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
});
