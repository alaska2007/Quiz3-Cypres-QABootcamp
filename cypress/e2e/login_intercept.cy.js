describe('OrangeHRM Login Feature Test Suite with Intercept - 8 Test Cases (Adapted to Quiz 3)', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    // 1. TC_LOG_001: Login sukses dengan data valid + Intercept Dashboard
    it('TC_LOG_001 - Berhasil login dengan kredensial yang valid', () => {
        cy.intercept('GET', '**/dashboard/employees/**').as('getEmployees')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@getEmployees')
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb').should('be.visible')
    })

    // 2. TC_LOG_002: Password salah + Intercept Messages
    it('TC_LOG_002 - Gagal login dengan password yang salah', () => {
        cy.intercept('GET', '**/core/i18n/messages').as('getMessages')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('Coba123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })

    // 3. TC_LOG_003: Username salah (menggunakan 'alaska' sesuai Quiz 3) + Intercept Auth
    it('TC_LOG_003 - Gagal login dengan username yang salah', () => {
        cy.intercept('POST', '**/auth/validate').as('postAuth')

        cy.get('input[name="username"]').type('alaska')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })

    // 4. TC_LOG_004: Username kosong + Intercept Action Summary
    it('TC_LOG_004 - Muncul pesan error wajib diisi saat username kosong', () => {
        cy.intercept('GET', '**/dashboard/employees/action-summary').as('getActionSummary')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
    })

    // 5. TC_LOG_005: Password kosong + Intercept Shortcuts
    it('TC_LOG_005 - Muncul pesan error wajib diisi saat password kosong', () => {
        cy.intercept('GET', '**/dashboard/shortcuts').as('getShortcuts')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.get('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
    })

    // 6. TC_LOG_007: Case-insensitive username + Intercept Buzz Feed
    it('TC_LOG_007 - Berhasil login meskipun menggunakan kombinasi huruf besar/kecil pada username', () => {
        cy.intercept('GET', '**/buzz/feed**').as('getBuzzFeed')

        cy.get('input[name="username"]').type('AdMin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')
    })

    // 7. TC_LOG_009: Masking password + Intercept Leaves
    it('TC_LOG_009 - Kolom password harus memiliki tipe password untuk menyembunyikan teks (masking)', () => {
        cy.intercept('GET', '**/dashboard/employees/leaves**').as('getLeaves')

        cy.get('input[name="password"]').should('have.attr', 'type', 'password')
    })

    // 8. TC_LOG_012: Forgot password + Intercept Reset Password
    it('TC_LOG_012 - Berhasil berpindah ke halaman reset password saat mengklik tautan lupa kata sandi', () => {
        cy.intercept('GET', '**/auth/requestPasswordResetCode').as('getResetPassword')

        cy.get('.orangehrm-login-forgot-header').click()

        cy.url().should('include', 'requestPasswordResetCode')
        cy.get('.orangehrm-forgot-password-container').should('be.visible')
    })

})