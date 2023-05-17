describe('Removing items in cart', () => {
    let main_url = 'https://demo.evershop.io/'

    it('Removing items in cart', () => {
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
                 cy.contains(`${item.name_item}`).nextAll().contains("a", "Remove").click()
                 cy.wait(2000)
            }); 
        });

        // Verify that cart is empty
        cy.xpath("//span[normalize-space()='Your cart is empty!']").should("have.text", "Your cart is empty!")

    });
})