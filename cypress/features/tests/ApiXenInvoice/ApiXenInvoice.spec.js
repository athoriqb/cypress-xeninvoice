const { Before, Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const invoiceJson = require('../../../fixtures/POST-CreateinvoiceValid.json')
const negativeInvoiceJson = require('../../../fixtures/POST-CreateinvoiceNegativeCase.json')
const edgeInvoiceJson = require('../../../fixtures/POST-CreateinvoiceEdgeCase.json')
const { generateTimestamp } = require('../../../support/utils.js')

var response

When('I hit POST Create Invoices with input all request params', () => {
    const body = JSON.stringify(invoiceJson).replace("{{$timestamp}}", generateTimestamp)
    response = cy.request({
      method: 'POST',
      url: 'https://api.xendit.co/v2/invoices',
      body: body,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X1p4WW5xN2NKMXJGOGRYWjV3TW9DVXZBY3VwSUF4Q2VXY0RVaXh0MEVhUXBLMEVsbjV4czVjNDU1dzRlbzY1VDo=',
      }
    })
    cy.wait(3000)
  })

Then('the response status code should be 200', () => {
    response.then((response) => {
      expect(response.status).to.eq(200)
    })
  })

Then('should have response params id invoices', () => {
  response.should((response) => {
    expect(response.body).to.have.property('id').and.to.not.be.null
  })
})

Then('should have response params external_id', () => {
  response.should((response) => {
    expect(response.body).to.have.property('external_id').and.to.not.be.null
  })
})

Then('should have response params user_id', () => {
  response.should((response) => {
    expect(response.body).to.have.property('user_id').and.to.not.be.null
  })
})

Then('should have response params status with PENDING', () => {
  response.should((response) => {
    expect(response.body).to.have.property('status').and.to.eq("PENDING")
  })
})

Then('should have response params amount', () => {
  response.should((response) => {
    expect(response.body).to.have.property('amount').and.to.eq(1800000)
  })
})

Then('should have response invoice url', () => {
  response.should((response) => {
    expect(response.body).to.have.property('invoice_url').and.to.not.be.null
  })
})

When('I hit POST Create Invoices when amount less than minimum', () => {
  const body = JSON.stringify(negativeInvoiceJson)
  response = cy.request({
    method: 'POST',
    url: 'https://api.xendit.co/v2/invoices',
    failOnStatusCode: false,
    body: body,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X1p4WW5xN2NKMXJGOGRYWjV3TW9DVXZBY3VwSUF4Q2VXY0RVaXh0MEVhUXBLMEVsbjV4czVjNDU1dzRlbzY1VDo=',
    }
  })
  cy.wait(3000)
})

Then('the response status code should be 400', () => {
  response.then((response) => {
    expect(response.status).to.eq(400)
  })
})

Then('should have message must be larger than or equal to 1', () => {
  response.then((response) => {
    let message = response.body.errors[0].messages[0]
    expect(message).to.include("must be larger than or equal to 1")
  })
})

When('I hit POST Create Invoices when amount more than maximum', () => {
  const body = JSON.stringify(edgeInvoiceJson)
  response = cy.request({
    method: 'POST',
    url: 'https://api.xendit.co/v2/invoices',
    failOnStatusCode: false,
    body: body,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X1p4WW5xN2NKMXJGOGRYWjV3TW9DVXZBY3VwSUF4Q2VXY0RVaXh0MEVhUXBLMEVsbjV4czVjNDU1dzRlbzY1VDo=',
    }
  })
  cy.wait(3000)
})