class paymentLinksPage {

    get createPaymentLinkBtn(){return cy.get("button[id='create-payment-link']")}
    get tableAllInvoices(){return cy.get("table[class='table']")}
    get sectionOrderDetail() {return cy.get("section[id='orderDetailsSection']")}
    get referenceIdInput() {return cy.get("input[name='referenceId']")}
    get amountTextBox() {return cy.get("input[name='amountDue']")}
    get totalLabel() {return cy.get("div[id='paymentSummarySectionGrandTotal']")}
    get createBtn() {return cy.get("button[name='submitFormButton']")}
    get proceedCreateBtn() {return cy.xpath("//div[@class='confirmation-modal-button-container']//button[@class='btn btn-primary btn-md']")}
    get successPopup() {return cy.get("div[class='modal-body']")}
    get closePopup() {return cy.get("img[alt='close_button']")}
    get urlCopyBtn() {return cy.get("button[class='btn btn-primary btn-md btn-with-icon btn-inside-input btn-no-label']")}
    get urlTextBox() {return cy.xpath("//div[@class='input-text-content']//input[@disabled]")}
    get downloadQRBtn() {return cy.get("button[id='payment-link-download-qr-btn']")}
    get createAnotherPaymentBtn() {return cy.get("button[id='payment-link-create-another-btn']")}
    get requiredValidation() {return cy.xpath("//span[@class='input-text-helper' and text()='Required']")}

    selectPaymentDetails(payment){
        var value
        switch (payment.toLowerCase()) {
            case "amount":
                value = "TOTAL_AMOUNT"
                break
            case "items":
                value = "ORDER_ITEMS"
                break
            case "open":
                value = "OPEN_AMOUNT"
                break
            default:
                throw "payment not found"
        }
        cy.xpath("//input[@value='"+value+"']//parent::div").then(($el) => {
            if ($el.is(':checked')) {
              cy.log("Already checked")
            } else {
              cy.wrap($el).click()
            }
          })
    }

    amount(number){
        this.amountTextBox.type(number)
    }
}
const paymentlinkpage = new paymentLinksPage()
export default paymentlinkpage