USE tradefy;
INSERT INTO Customers (fName,tradeAcct ,email, password, createdAt, updatedAt)
VALUES 
    ('Mallika','TFY03564', 'mallika@email.com', 'mallika', sysdate(),sysdate()),
    ('Ria', 'TFY09235','ria@email.com', 'ria',sysdate(),sysdate())
;
USE tradefy;
INSERT INTO CustomerBankAccts (bankName, bankAcctNo, billingAddress,zip,CustomerId, createdAt, updatedAt)
VALUES 
    ('JP Morgan Chase', '150487303', '1254 West El Camino Ave' , 95833,1,sysdate(),sysdate()),
    ('Bank of America', '265345987', '2341 Truxel Road', 95834,2,sysdate(),sysdate())
;