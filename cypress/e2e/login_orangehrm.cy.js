describe('OrangeHRM Login Feature Test Suite - 12 Test Cases', () => {

  // Membuka halaman login sebelum setiap tes berjalan
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // 1. TC_LOG_001: Login sukses dengan data valid
  it('TC_LOG_001 - Berhasil login dengan kredensial yang valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb').should('be.visible')
  })

  // 2. TC_LOG_002: Password salah
  it('TC_LOG_002 - Gagal login dengan password yang salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Coba123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  // 3. TC_LOG_003: Username salah
  it('TC_LOG_003 - Gagal login dengan username yang salah', () => {
    cy.get('input[name="username"]').type('alaska')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  // 4. TC_LOG_004: Username kosong
  it('TC_LOG_004 - Muncul pesan error wajib diisi saat username kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
  })

  // 5. TC_LOG_005: Password kosong
  it('TC_LOG_005 - Muncul pesan error wajib diisi saat password kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
  })

  // 6. TC_LOG_006: Kedua field kosong
  it('TC_LOG_006 - Muncul pesan error saat kedua field kosong', () => {
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-input-field-error-message').should('have.length', 2)
  })

  // 7. TC_LOG_007: Sensitivitas huruf pada Username (Case-insensitive di OrangeHRM)
  it('TC_LOG_007 - Berhasil login meskipun menggunakan kombinasi huruf besar/kecil pada username', () => {
    cy.get('input[name="username"]').type('AdMin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.url().should('include', '/dashboard')
  })

  // 8. TC_LOG_008: Sensitivitas huruf pada Password (Case-sensitive)
  it('TC_LOG_008 - Gagal login jika salah menggunakan huruf besar/kecil pada password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  // 9. TC_LOG_009: Masking password
  it('TC_LOG_009 - Kolom password harus memiliki tipe password untuk menyembunyikan teks (masking)', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password')
  })

  // 10. TC_LOG_010: Input username dengan spasi
  it('TC_LOG_010 - Gagal login ketika username tidak sengaja mengandung spasi', () => {
    cy.get('input[name="username"]').type('Ad min')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  // 11. TC_LOG_011: Input password dengan spasi
  it('TC_LOG_011 - Gagal login ketika password tidak sengaja mengandung spasi', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin 123')
    cy.get('button[type="submit"]').click()

    // Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  })

  // 12. TC_LOG_012: Tombol Forgot Your Password berfungsi
  it('TC_LOG_012 - Berhasil berpindah ke halaman reset password saat mengklik tautan lupa kata sandi', () => {
    cy.get('.orangehrm-login-forgot-header').click()

    // Assertion
    cy.url().should('include', 'requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-container').should('be.visible')
  })

})