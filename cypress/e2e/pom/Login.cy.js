import LoginPage from '../../support/pages/LoginPage'

describe('OrangeHRM Login Feature Test Suite - 12 Test Cases with POM', () => {

    // Membuka halaman login sebelum setiap tes berjalan
    beforeEach(() => {
        LoginPage.navigate()
    })

    // 1. TC_LOG_001: Login sukses dengan data valid
    it('TC_LOG_001 - Berhasil login dengan kredensial yang valid', () => {
        LoginPage.login('Admin', 'admin123')

        // Assertion
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb').should('be.visible')
    })

    // 2. TC_LOG_002: Password salah
    it('TC_LOG_002 - Gagal login dengan password yang salah', () => {
        LoginPage.login('Admin', 'Coba123')

        // Assertion
        LoginPage.elements.errorMessage().should('have.text', 'Invalid credentials')
    })

    // 3. TC_LOG_003: Username salah
    it('TC_LOG_003 - Gagal login dengan username yang salah', () => {
        LoginPage.login('alaska', 'admin123')

        // Assertion
        LoginPage.elements.errorMessage().should('have.text', 'Invalid credentials')
    })

    // 4. TC_LOG_004: Username kosong
    it('TC_LOG_004 - Muncul pesan error wajib diisi saat username kosong', () => {
        LoginPage.login('', 'admin123')

        // Assertion
        LoginPage.elements.requiredError().should('be.visible').and('have.text', 'Required')
    })

    // 5. TC_LOG_005: Password kosong
    it('TC_LOG_005 - Muncul pesan error wajib diisi saat password kosong', () => {
        LoginPage.login('Admin', '')

        // Assertion
        LoginPage.elements.requiredError().should('be.visible').and('have.text', 'Required')
    })

    // 6. TC_LOG_006: Kedua field kosong
    it('TC_LOG_006 - Muncul pesan error saat kedua field kosong', () => {
        LoginPage.clickLogin()

        // Assertion
        LoginPage.elements.requiredError().should('have.length', 2)
    })

    // 7. TC_LOG_007: Sensitivitas huruf pada Username (Case-insensitive di OrangeHRM)
    it('TC_LOG_007 - Berhasil login meskipun menggunakan kombinasi huruf besar/kecil pada username', () => {
        LoginPage.login('AdMin', 'admin123')

        // Assertion
        cy.url().should('include', '/dashboard')
    })

    // 8. TC_LOG_008: Sensitivitas huruf pada Password (Case-sensitive)
    it('TC_LOG_008 - Gagal login jika salah menggunakan huruf besar/kecil pada password', () => {
        LoginPage.login('Admin', 'Admin123')

        // Assertion
        LoginPage.elements.errorMessage().should('have.text', 'Invalid credentials')
    })

    // 9. TC_LOG_009: Masking password
    it('TC_LOG_009 - Kolom password harus memiliki tipe password untuk menyembunyikan teks (masking)', () => {
        LoginPage.elements.passwordInput().should('have.attr', 'type', 'password')
    })

    // 10. TC_LOG_010: Input username dengan spasi
    it('TC_LOG_010 - Gagal login ketika username tidak sengaja mengandung spasi', () => {
        LoginPage.login('Ad min', 'admin123')

        // Assertion
        LoginPage.elements.errorMessage().should('have.text', 'Invalid credentials')
    })

    // 11. TC_LOG_011: Input password dengan spasi
    it('TC_LOG_011 - Gagal login ketika password tidak sengaja mengandung spasi', () => {
        LoginPage.login('Admin', 'admin 123')

        // Assertion
        LoginPage.elements.errorMessage().should('have.text', 'Invalid credentials')
    })

    // 12. TC_LOG_012: Tombol Forgot Your Password berfungsi
    it('TC_LOG_012 - Berhasil berpindah ke halaman reset password saat mengklik tautan lupa kata sandi', () => {
        LoginPage.clickForgotPassword()

        // Assertion
        cy.url().should('include', 'requestPasswordResetCode')
        LoginPage.elements.forgotPasswordContainer().should('be.visible')
    })

})