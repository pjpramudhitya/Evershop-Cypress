describe('Sign Up Process', () => {
  let name = "Agad"
  let email = "agad.coba7@gmail.com"
  let password = "agadagad123"
  let main_url = 'https://demo.evershop.io/'

  it('Sign up with new email', () => {
    cy.visit(main_url)

    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
    cy.xpath("//a[normalize-space()='Create an account']").click()

    // Fill name, email and password
    cy.xpath("//input[@placeholder='Full Name']").type(name)
    cy.xpath("//input[@placeholder='Email']").type(email)
    cy.xpath("//input[@placeholder='Password']").type(password)

    // Click Sign Up button
    cy.xpath("//button[@type='button']").click()

    // Verify that successfully signed up
    cy.xpath("//a[@href='/account']//*[name()='svg']").click()
    cy.xpath("//div[@class='account-details-name flex gap-1']").should("have.text", name)
    cy.xpath("//div[@class='account-details-email flex gap-1']").should("have.text", email)

  })

  it('Sign up with old email', () => {
    cy.visit(main_url)

    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
    cy.xpath("//a[normalize-space()='Create an account']").click()

    // Fill name, email and password
    cy.xpath("//input[@placeholder='Full Name']").type(name)
    cy.xpath("//input[@placeholder='Email']").type(email)
    cy.xpath("//input[@placeholder='Password']").type(password)

    // Click Sign Up button
    cy.xpath("//button[@type='button']").click()

    // Verify that email already signed up
    cy.xpath("//div[@class='text-critical mb-1']").should("have.text", 'duplicate key value violates unique constraint "EMAIL_UNIQUE"')
  })
})