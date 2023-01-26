class homePage {
    get titleH2() {return cy.get("h2[class='mt-5 text-center']")}
    get paymentLinkMenu() {return cy.xpath("//a[contains(@class,'level-1')]//span[contains(@class,'sidebar text-body') and text()='Payment Links']")}
    get paymentLinkSubmenu() {return cy.xpath("//a[contains(@class,'level-2')]//span[contains(@class,'sidebar text-body') and text()='Payment Links']")}

    accessPaymentLink(){
        this.paymentLinkMenu.click()
        this.paymentLinkSubmenu.click()
    }
}
const homepage = new homePage()
export default homepage