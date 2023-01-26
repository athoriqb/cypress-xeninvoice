const { Before, Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
import loginPage from '../../pages/loginPage.spec.js'
import homePage from '../../pages/homePage.spec.js'
import paymentLinkPage from '../../pages/paymentLinksPage.spec.js'

var totalAmount
var paymentLink
var externalId

Given('merchant login to xendit dashboard', () => {
    loginPage.visit()
    loginPage.titleH4.should('have.text','Login to your Dashboard')
    cy.fixture("sample-data.json").then((sample) => {
        data = sample
        loginPage.login(data.email, data.pass)
      })
    cy.wait(10000, { timeout: 10000 }).then(() => {
        cy.url().should('include','/home')
    })
})

When('merchant access payment link', () => {
    cy.wait(10000, { timeout: 10000 }).then(() => {
        return homePage.titleH2.should('contain.text','welcome back')
    })
    homePage.accessPaymentLink()
})

When('click create payment link button', () => {
    paymentLinkPage.createPaymentLinkBtn.scrollIntoView()
    paymentLinkPage.createPaymentLinkBtn.should('be.enabled').click()

})

When('choose Show total amount due only', () => {
    cy.wait(10000, { timeout: 10000 }).then(() => {
        return paymentLinkPage.sectionOrderDetail.should('be.visible')
    })
    paymentLinkPage.referenceIdInput.then(($el) => {
        externalId = $el.attr('value')
    })
    paymentLinkPage.selectPaymentDetails("amount")
})

When('input amount', () => {
    paymentLinkPage.amount(100000)
    paymentLinkPage.totalLabel.then(($el) => {
        totalAmount = $el.text()
    })
})

When('click Create payment button', () => {
    paymentLinkPage.createBtn.click()
})

When('click proceed to create button', () => {
    paymentLinkPage.proceedCreateBtn.click()
})

Then('show pop up The payment link has been created', () => {
    cy.wait(10000, { timeout: 10000 }).then(() => {
        return paymentLinkPage.successPopup.should('be.visible')
    })
})

Then('show button to close pop up', () => {
    paymentLinkPage.closePopup.should('be.visible')
})

Then('show url that able to copy', () => {
    paymentLinkPage.urlCopyBtn.should('be.visible')
    paymentLinkPage.urlTextBox.then(($el) => {
        paymentLink = $el.attr('value')
    })
})

Then('show button to download QR code', () => {
    paymentLinkPage.downloadQRBtn.should('be.visible')
})

Then('show button to create another payment link', () => {
    paymentLinkPage.createAnotherPaymentBtn.should('be.visible')
})

Then('cust can access payment link', () => {
    cy.visit(paymentLink)
    cy.wait(10000, { timeout: 10000 }).then(() => {
        cy.contains(externalId).should('be.visible')
        cy.contains(totalAmount).should('be.visible')
    })
})

When('choose Show order items', () => {
    cy.wait(10000, { timeout: 10000 }).then(() => {
        return paymentLinkPage.sectionOrderDetail.should('be.visible')
    })
    paymentLinkPage.selectPaymentDetails("items")
})

Then('show validation required message', () => {
    paymentLinkPage.requiredValidation.should('be.visible')
})

When('input amount 0', () => {
    paymentLinkPage.amount(0)
})

Then('show validation error message', () => {
    cy.contains("There was an error with the format submitted to the server.").should('be.visible')
})