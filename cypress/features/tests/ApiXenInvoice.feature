@api
Feature: API XenInvoices (Payment Link)

    Scenario: Success create invoice with use that filled with required and option params
         When I hit POST Create Invoices with input all request params
         Then the response status code should be 200
         And should have response params id invoices
         And should have response params external_id
         And should have response params user_id
         And should have response params status with PENDING
         And should have response params amount
         And should have response invoice url 

    Scenario: Failed create invoice when amount less than minimum
         When I hit POST Create Invoices when amount less than minimum
         Then the response status code should be 400
         And should have message must be larger than or equal to 1

    Scenario: Failed create invoice when amount more than maximum
         When I hit POST Create Invoices when amount more than maximum
         Then the response status code should be 400