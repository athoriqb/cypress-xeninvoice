@web
Feature: XenInvoices Dashboard features

    Scenario: Verify merchant can generate single payment link with Show total amount due only and include paylater payment
        Given merchant login to xendit dashboard
        When merchant access payment link
        And click create payment link button
        And choose Show total amount due only
        And input amount
        And click Create payment button
        And click proceed to create button
        Then show pop up The payment link has been created
        And show button to close pop up
        And show url that able to copy
        And show button to download QR code
        And show button to create another payment link
        And cust can access payment link

    Scenario: Verify show validation if order items details not input
        Given merchant login to xendit dashboard
        When merchant access payment link
        And click create payment link button
        And choose Show order items
        And click Create payment button
        Then show validation required message 

    Scenario: Verify show validation if input amount less than minimum
        Given merchant login to xendit dashboard
        When merchant access payment link
        And click create payment link button
        And choose Show total amount due only
        And input amount 0
        And click Create payment button
        And click proceed to create button
        Then show validation error message 