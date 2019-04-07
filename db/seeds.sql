-- Data for customers table
USE tradefy;
INSERT INTO Customers (fullName,tradeAcct ,email, password)
VALUES 
    ('Mallika','TFY03564', 'mallika@email.com', 'mallika'),
    ('Ria', 'TFY09235','ria@email.com', 'ria')
;

USE tradefy;
INSERT INTO CustomerBankAccts (bankName, bankAcctNo, billingAddress,zip,CustomerId)
VALUES 
    ('JP Morgan Chase', '150487303', '1254 West El Camino Ave' , 95833,1),
    ('Bank of America', '265345987', '2341 Truxel Road', 95834,2)
;