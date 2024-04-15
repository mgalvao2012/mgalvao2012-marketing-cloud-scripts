# Marketing Cloud Scripts

This repository was created for helping with some use cases when is necessary to handle the data extension before used it in Journey Builder.

## The main use case is flattern a csv file with json content.

**source**

SubscriberKey,Id,EmailAddress,FinancialAccount
003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,"[{""OpenDate"":""2003-05-16"",""CloseDate"":null,""Name"":""eTrade"",""FinancialAccountType"":""Brokerage"",""FinancialAccountStatus"":""Open""},{""OpenDate"":""2011-09-27"",""CloseDate"":""2012-09-28"",""Name"":""Vanguard 401(b)"",""FinancialAccountType"":""401(b)"",""FinancialAccountStatus"":""Open""}]"

**target**

SubscriberKey,Id,EmailAddress,Name,FinancialAccountType,OpenDate,CloseDate
003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,eTrade,Brokerage,2003-05-16,
003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,Vanguard 401(b),401(b),2011-09-27,2012-09-28

### How to do it using python. This approach is recommended when the CSV is stored outside of Marketing Cloud:

```
 python3 convert.py source.csv target.csv
```

### How to do it using SSJS. This approach is recommended when the CSV is stored inside of Marketing Cloud:=

[[convertDE.js](./convertDE.js)]
