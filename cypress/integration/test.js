describe('Receipt Validation Test', function () {
    // 1. Validate fields for each reciept
    it('should validate fields', function () {
        // Receipt 1
        cy.readFile('receipts.json').its(0).its('storeId').should('eq', 'WAL001');
        cy.readFile('receipts.json').its(0).its('pinCode').should('eq', 30234);
        cy.readFile('receipts.json').its(0).its('receiptNumber').should('eq', 1);
        cy.readFile('receipts.json').its(0).its('items').its(0).its('itemId').should('eq', 'GROC001');
        cy.readFile('receipts.json').its(0).its('items').its(0).its('itemPrice').should('eq', 10);
        cy.readFile('receipts.json').its(0).its('items').its(0).its('taxRate').should('eq', 0.06);
        cy.readFile('receipts.json').its(0).its('items').its(0).its('discount').should('eq', 0.00);
        cy.readFile('receipts.json').its(0).its('items').its(1).its('itemId').should('eq', 'GROC001');
        cy.readFile('receipts.json').its(0).its('items').its(1).its('itemPrice').should('eq', 10);
        cy.readFile('receipts.json').its(0).its('items').its(1).its('taxRate').should('eq', 0.06);
        cy.readFile('receipts.json').its(0).its('items').its(1).its('discount').should('eq', 0.00);
        cy.readFile('receipts.json').its(0).its('items').its(2).its('itemId').should('eq', 'GROC002');
        cy.readFile('receipts.json').its(0).its('items').its(2).its('itemPrice').should('eq', 20);
        cy.readFile('receipts.json').its(0).its('items').its(2).its('taxRate').should('eq', 0.02);
        cy.readFile('receipts.json').its(0).its('items').its(2).its('discount').should('eq', 0.10);
        cy.readFile('receipts.json').its(0).its('itemsSold').should('eq', 3);
        cy.readFile('receipts.json').its(0).its('total').should('eq', 39.60);
        cy.readFile('receipts.json').its(0).its('timestamp').should('eq', '2021-02-01 14:00:00 EST');

        // Receipt 2
        cy.readFile('receipts.json').its(1).its('storeId').should('eq', 'WAL001');
        cy.readFile('receipts.json').its(1).its('pinCode').should('eq', 30234);
        cy.readFile('receipts.json').its(1).its('receiptNumber').should('eq', 2);
        cy.readFile('receipts.json').its(1).its('items').its(0).its('itemId').should('eq', 'GROC001');
        cy.readFile('receipts.json').its(1).its('items').its(0).its('itemPrice').should('eq', 10);
        cy.readFile('receipts.json').its(1).its('items').its(0).its('taxRate').should('eq', 0.06);
        cy.readFile('receipts.json').its(1).its('items').its(0).its('discount').should('eq', 0.00);
        cy.readFile('receipts.json').its(1).its('items').its(1).its('itemId').should('eq', 'GROC001');
        cy.readFile('receipts.json').its(1).its('items').its(1).its('itemPrice').should('eq', 10);
        cy.readFile('receipts.json').its(1).its('items').its(1).its('taxRate').should('eq', 0.06);
        cy.readFile('receipts.json').its(1).its('items').its(1).its('discount').should('eq', 0.00);
        cy.readFile('receipts.json').its(1).its('items').its(2).its('itemId').should('eq', 'GROC002');
        cy.readFile('receipts.json').its(1).its('items').its(2).its('itemPrice').should('eq', 20);
        cy.readFile('receipts.json').its(1).its('items').its(2).its('taxRate').should('eq', 0.02);
        cy.readFile('receipts.json').its(1).its('items').its(2).its('discount').should('eq', 0.10);
        cy.readFile('receipts.json').its(1).its('items').its(3).its('itemId').should('eq', 'GROC002');
        cy.readFile('receipts.json').its(1).its('items').its(3).its('itemPrice').should('eq', -20);
        cy.readFile('receipts.json').its(1).its('items').its(3).its('taxRate').should('eq', 0.02);
        cy.readFile('receipts.json').its(1).its('items').its(3).its('discount').should('eq', 0.10);
        cy.readFile('receipts.json').its(1).its('itemsSold').should('eq', 2);
        cy.readFile('receipts.json').its(1).its('total').should('eq', 21.20);
        cy.readFile('receipts.json').its(1).its('timestamp').should('eq', '2021-02-01 14:00:00 EST');
    });

    // 2. Validate total for each reciept
    it('should validate grand totals', function () {
        // Receipt 1
        var total = 0.0;
        var itemTotal = 0.0;
        var price = 10;
        var taxRate = 0.06;
        var discount = 0.00;
        cy.readFile('receipts.json').its(0).its('items').its(0).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(0).its('items').its(0).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(0).its('items').its(0).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;

        price = 10;
        taxRate = 0.06;
        discount = 0.00;
        cy.readFile('receipts.json').its(0).its('items').its(1).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(0).its('items').its(1).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(0).its('items').its(1).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;

        price = 20;
        taxRate = 0.02;
        discount = 0.10;
        cy.readFile('receipts.json').its(0).its('items').its(2).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(0).its('items').its(2).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(0).its('items').its(2).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;
        cy.readFile('receipts.json').its(0).its('total').should('eq', Math.round(total * 10) / 10);

        // Receipt 2
        total = 0.0;
        price = 10;
        taxRate = 0.06;
        discount = 0.00;
        cy.readFile('receipts.json').its(1).its('items').its(0).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(1).its('items').its(0).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(1).its('items').its(0).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;

        price = 10;
        taxRate = 0.06;
        discount = 0.00;
        cy.readFile('receipts.json').its(1).its('items').its(1).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(1).its('items').its(1).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(1).its('items').its(1).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;

        price = 20;
        taxRate = 0.02;
        discount = 0.10;
        cy.readFile('receipts.json').its(1).its('items').its(2).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(1).its('items').its(2).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(1).its('items').its(2).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;

        price = -20;
        taxRate = 0.02;
        discount = 0.10;
        cy.readFile('receipts.json').its(1).its('items').its(3).its('itemPrice').should('eq', price);
        cy.readFile('receipts.json').its(1).its('items').its(3).its('taxRate').should('eq', taxRate);
        cy.readFile('receipts.json').its(1).its('items').its(3).its('discount').should('eq', discount);
        itemTotal = price + (price * taxRate) - (price * discount);
        total += itemTotal;
        cy.readFile('receipts.json').its(1).its('total').should('eq', Math.round(total * 10) / 10);
    });

    // 3. Validate count of items sold for each receipt
    it('should validate items sold', function () {
        var receipts = require('/receipts.json'); 
        var itemsCount = [];
        var items = [];
        var count = 0;

        for (var i = 0; i < receipts.length; i++) {
            for (var j = 0; j < receipts[i].items.length; j++) {
                if (receipts[i].items[j].itemPrice >= 0) {
                    items.push(receipts[i].items[j].itemId);
                    count++;
                }
                if (receipts[i].items[j].itemPrice < 0) {
                    items.pop(receipts[i].items[j - 1].itemId);
                    count--;
                }
            }
            itemsCount.push(count);
            count = 0;
        }

        // Receipt 1
        var itemsSold = 3;
        cy.expect(itemsCount[0]).to.deep.equal(itemsSold);
        cy.readFile('receipts.json').its(0).its('itemsSold').should('be.gt', 0);
        cy.readFile('receipts.json').its(0).its('itemsSold').should('eq', itemsSold);

        // Receipt 2
        itemsSold = 2;
        cy.expect(itemsCount[1]).to.deep.equal(itemsSold);
        cy.readFile('receipts.json').its(1).its('itemsSold').should('be.gt', 0);
        cy.readFile('receipts.json').its(1).its('itemsSold').should('eq', itemsSold);
    });

    // 4. Ensures receipts are valid
    it('should ensure receipts are valid', function () {
        var receipts = require('/receipts.json');
        var timestamp = receipts[0].timestamp;

        // No 2 receipts should have same receiptNumber
        cy.readFile('receipts.json').its(0).its('receiptNumber').should('eq', receipts[0].receiptNumber);
        cy.readFile('receipts.json').its(1).its('receiptNumber').should('eq', receipts[1].receiptNumber);
        cy.readFile('receipts.json').its(0).its('timestamp').should('eq', timestamp);

        cy.readFile('receipts.json').its(0).its('receiptNumber').should('not.eq', receipts[1].receiptNumber);
        cy.readFile('receipts.json').its(1).its('receiptNumber').should('not.eq', receipts[0].receiptNumber);
        cy.readFile('receipts.json').its(1).its('timestamp').should('eq', timestamp);
        
        // Expect receipts to come from the same date
        cy.expect(receipts[0].timestamp).to.deep.equal(receipts[1].timestamp);

        // No 2 receipts should have a different pinCode or storeId
        var pinCode = 30234;
        var storeId = 'WAL001';

        cy.readFile('receipts.json').its(0).its('pinCode').should('eq', pinCode);
        cy.readFile('receipts.json').its(0).its('storeId').should('eq', storeId);

        cy.readFile('receipts.json').its(1).its('pinCode').should('eq', pinCode);
        cy.readFile('receipts.json').its(1).its('storeId').should('eq', storeId);
    });

    // 5. Determine most sold item
    it('should return most sold item', function () {
        var receipts = require('/receipts.json');
        var mostSoldItem = 'GROC001';
        var mostFrequentItem = 'temp';
        var mostFrequent = 1;
        var most = 0;
        var items = [];

        for (var i = 0; i < receipts.length; i++) {
            for (var j = 0; j < receipts[i].items.length; j++) {
                if (receipts[i].items[j].itemPrice >= 0) {
                    items.push(receipts[i].items[j].itemId);
                }
                if (receipts[i].items[j].itemPrice < 0) {
                    items.pop(receipts[i].items[j - 1].itemId);
                }
            }
        }

        for (var k = 0; k < items.length; k++) {
            for (var l = k; l < items.length; l++) {
                if (items[k] === items[l]) {
                    most++;
                }
                if (mostFrequent < most) {
                    mostFrequent = most;
                    mostFrequentItem = items[k];
                }
            }
            most = 0;
        }
        cy.expect(mostFrequentItem).to.deep.equal(mostSoldItem);
    });
});