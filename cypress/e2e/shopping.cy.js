describe('Shopping Features', () => {
    let email = "agad.coba3@gmail.com"
    let password = "agadagad123"
    let main_url = 'https://demo.evershop.io/'
  
    it('Shopping feature without login', () => {
        cy.visit(main_url)

        // Selecting items
        cy.fixture("items.json").then((itemsArray) => {
            // Iterate over the JSON array
            itemsArray.forEach((item) => {
                 // Perform actions or assertions on each item
                 // Open men items
                 cy.xpath("//a[normalize-space()='Men']").click()

                 // cy.log(`Name: ${item.name_item}`);

                 // Find item by name
                 cy.contains(`${item.name_item}`).click()

                 // Set quantity
                 cy.xpath("//input[@placeholder='Qty']").clear()
                 cy.xpath("//input[@placeholder='Qty']").type(`${item.quantity}`)

                 // Set size
                 cy.contains("a", `${item.size}`).click()
                 cy.wait(2000)

                 // Set color
                 cy.contains("a", `${item.color}`).click()
                 cy.wait(2000)

                 // Click add to chart
                 cy.xpath("//button[@type='button']").click()

                 
            });
            
        });

        // Verify cart
        cy.xpath("//a[@class='mini-cart-icon']//*[name()='svg']").click()
        cy.fixture("items.json").then((itemsArray) => {
            // Iterate over the JSON array
            itemsArray.forEach((item) => {
                 // Perform actions or assertions on each item
                 cy.contains(`${item.name_item}`).should("have.text",`${item.name_item}`)
            }); 
        });

        cy.xpath("//a[@class='button primary']").click()

        // Contact information
        
        cy.fixture('users.json').as('userData');
        cy.get('@userData').then((userData) => {
            // Access individual properties from the JSON data
            const name = userData.name;
            email = userData.email;
            const phone = userData.phone;
            const address = userData.address;
            const city = userData.city;
            const country = userData.country;
            const province = userData.province;
            const post_code = userData.post_code;

            cy.xpath("//input[@placeholder='Email']").type(email)
            cy.xpath("//button[@type='button']").click()
            cy.wait(2000)
            cy.xpath("//input[@placeholder='Full name']").type(name)
            cy.xpath("//input[@placeholder='Telephone']").type(phone)
            cy.xpath("//input[@placeholder='Address']").type(address)
            cy.xpath("//input[@placeholder='City']").type(city)
            cy.xpath("(//select[@id='address[country]'])[1]").select(country)
            cy.xpath("(//select[@id='address[province]'])[1]").select(province)
            cy.xpath("//input[@placeholder='Postcode']").type(post_code)
            cy.wait(2000)
            cy.xpath("//label[@for='method0']//span[@class='radio-unchecked']").click()
            cy.xpath("//button[@type='button']").click()
        });

        // Choose payment
        cy.wait(2000)
        cy.xpath("(//*[name()='svg'])[10]").click()
        cy.xpath("//button[@type='button']").click()
        cy.wait(2000)
    });


    it('Shopping feature with login', () => {
      cy.visit(main_url)
        
      // Login Sequences
      cy.xpath("//a[@href='/account/login']//*[name()='svg']").click()
      cy.xpath("//input[@placeholder='Email']").type(email)
      cy.xpath("//input[@placeholder='Password']").type(password)
      cy.xpath("//button[@type='submit']").click()
        
    })
  })