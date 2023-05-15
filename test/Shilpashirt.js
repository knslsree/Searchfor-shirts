const { Builder , By, Key, until} = require ('selenium-webdriver');
const assert = require('assert');
const should = require('chai').should();
const expect = require('chai').expect;

/*  As a customer,
I want to be able to search for a specific product,
so that I can find the product I want to buy.
*/

//Test grouping:search
describe.only('Search for a product', () => {
    //Test case:
    context('I search for a specific product',() => {
        it('I should see the product that i have searched for ', async() => {
            //start the webbrowser
            const driver = await new Builder().forBrowser('firefox').build();

            //Search for a product
           try{

            //Move to magento site
            await driver.get('https://magento.softwaretestingboard.com/');

            //Get the search input
            await driver.wait(until.elementLocated(By.css('#search')),50000);
            await driver.findElement(By.id('search')).sendKeys('shirt for men', Key.RETURN);

            //Find the third product
             await driver.wait(until.elementsLocated(By.css('.item.product.product-item:nth-child(3)'))),10000;
            const product= await driver.findElement(By.css('.item.product.product-item:nth-child(3)'));

            //find the information in the product we selected
             let productTitle = await product.findElement(By.css('.product-item-link'));
             let productPrice = await product.findElement(By.css('.price'))


            // Extract the text
            let productTitleText = await productTitle.getText();
            let productPriceText = await productPrice.getText();

            //Verify the text 
            productTitleText.should.equal('Balboa Persistence Tee');
            productPriceText.should.equal('$29.00');
           

            //Asserts
        assert.equal(productTitleText, 'Balboa Persistence Tee');//Builtin Node
        expect(productTitleText).to.equal('Balboa Persistence Tee');// Chai expect
        productTitleText.should.equal('Balboa Persistence Tee');// Chai should

        assert.equal( productPriceText, '$29.00');//Builtin Node
        expect( productPriceText).to.equal('$29.00');// Chai expect
        productPriceText.should.equal('$29.00');// Chai should

        console.log(productTitleText, productPriceText);
        await driver.sleep(3000);

            await driver.quit();
           } 
           finally {
           //await driver.quit();
           }

        });
    });
});