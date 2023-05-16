describe('Login Process', () => {
  let name = "Agad"
  let email = "agad.coba3@gmail.com"
  let password = "agadagad123"
  let main_url = 'https://demo.evershop.io/'
  let wrong_email = "wrong@email.com"
  let wrong_password = "wrong_pass"

  it('Login using correct email and password', () => {
    cy.visit(main_url)

    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
    cy.xpath("//input[@placeholder='Email']").type(email)
    cy.xpath("//input[@placeholder='Password']").type(password)
    
    // Click login button
    cy.xpath("//button[@type='submit']").click()
    
    // Verify that successfully loged in
    cy.xpath("//a[@href='/account']//*[name()='svg']").click()
    cy.xpath("//div[@class='account-details-name flex gap-1']").should("have.text", name)
    cy.xpath("//div[@class='account-details-email flex gap-1']").should("have.text", email)

  })

  it('Login using incorrect email and password', () => {
    cy.visit(main_url)

    cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
    cy.xpath("//input[@placeholder='Email']").type(wrong_email)
    cy.xpath("//input[@placeholder='Password']").type(wrong_password)
    
    // Click login button
    cy.xpath("//button[@type='submit']").click()
    
    // Verify that email or password is invalid
    cy.xpath("//div[@class='text-critical mb-1']").should("have.text", "Invalid email or password")
  })
})