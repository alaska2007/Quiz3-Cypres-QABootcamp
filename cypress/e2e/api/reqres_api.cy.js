describe('ReqRes API Automation Testing - 12 Test Cases', () => {

    // 1. GET: List Users (Mengambil daftar pengguna)
    it('TC_API_001 - Berhasil mengambil daftar user (GET)', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.page).to.eq(2)
                expect(response.body.data).to.not.be.empty
            })
    })

    // 2. GET: Single User (Mengambil detail satu user)
    it('TC_API_002 - Berhasil mengambil detail satu user (GET)', () => {
        cy.request('GET', 'https://reqres.in/api/users/2')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.id).to.eq(2)
                expect(response.body.data.email).to.include('@reqres.in')
            })
    })

    // 3. GET: Single User Not Found (Menguji user yang tidak ada)
    it('TC_API_003 - Gagal menemukan user / Not Found (GET)', () => {
        cy.request({ method: 'GET', url: 'https://reqres.in/api/users/23', failOnStatusCode: false })
            .then((response) => {
                expect(response.status).to.eq(404)
            })
    })

    // 4. GET: List <RESOURCE> (Mengambil daftar resource warna)
    it('TC_API_004 - Berhasil mengambil list resource (GET)', () => {
        cy.request('GET', 'https://reqres.in/api/unknown')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.per_page).to.eq(6)
            })
    })

    // 5. GET: Single <RESOURCE> (Mengambil detail satu resource)
    it('TC_API_005 - Berhasil mengambil detail single resource (GET)', () => {
        cy.request('GET', 'https://reqres.in/api/unknown/2')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data.name).to.eq('fuchsia rose')
            })
    })

    // 6. GET: Single <RESOURCE> Not Found
    it('TC_API_006 - Gagal menemukan resource (GET)', () => {
        cy.request({ method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false })
            .then((response) => {
                expect(response.status).to.eq(404)
            })
    })

    // 7. POST: Create User (Membuat data user baru)
    it('TC_API_007 - Berhasil membuat user baru (POST)', () => {
        cy.request('POST', 'https://reqres.in/api/users', { name: 'Alaska', job: 'QA Engineer' })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.name).to.eq('Alaska')
                expect(response.body.job).to.eq('QA Engineer')
            })
    })

    // 8. PUT: Update User (Mengubah data user secara keseluruhan)
    it('TC_API_008 - Berhasil memperbarui data user dengan PUT', () => {
        cy.request('PUT', 'https://reqres.in/api/users/2', { name: 'Alaska Napitupulu', job: 'Senior QA' })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Alaska Napitupulu')
                expect(response.body.job).to.eq('Senior QA')
            })
    })

    // 9. PATCH: Update User (Mengubah sebagian data user)
    it('TC_API_009 - Berhasil memperbarui sebagian data user dengan PATCH', () => {
        cy.request('PATCH', 'https://reqres.in/api/users/2', { job: 'Automation Engineer' })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.job).to.eq('Automation Engineer')
            })
    })

    // 10. DELETE: Delete User (Menghapus data user)
    it('TC_API_010 - Berhasil menghapus user (DELETE)', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
            .then((response) => {
                expect(response.status).to.eq(204)
            })
    })

    // 11. POST: Register Successful (Mendaftar akun sukses)
    it('TC_API_011 - Berhasil registrasi akun (POST)', () => {
        cy.request('POST', 'https://reqres.in/api/register', { email: 'eve.holt@reqres.in', password: 'pistol' })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.token).to.not.be.null
            })
    })

    // 12. POST: Login Successful (Login sukses)
    it('TC_API_012 - Berhasil login akun (POST)', () => {
        cy.request('POST', 'https://reqres.in/api/login', { email: 'eve.holt@reqres.in', password: 'cityslicka' })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.token).to.not.be.null
            })
    })

})