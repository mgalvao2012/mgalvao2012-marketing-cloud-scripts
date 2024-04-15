# Convert csv file with json in flattern csv:
# SubscriberKey,Id,EmailAddress,FinancialAccount
# 003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,"[{""OpenDate"":""2003-05-16"",""CloseDate"":null,""Name"":""eTrade"",""FinancialAccountType"":""Brokerage"",""FinancialAccountStatus"":""Open""},{""OpenDate"":""2011-09-27"",""CloseDate"":null,""Name"":""Vanguard 401(b)"",""FinancialAccountType"":""401(b)"",""FinancialAccountStatus"":""Open""}]"
#
# SubscriberKey,Id,EmailAddress,Name,FinancialAccountType,OpenDate,CloseDate
# 003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,eTrade,Brokerage,2003-05-16,
# 003Hn00002gZRSoIAO,003Hn00002gZRSoIAO,tiara.torphy@cumulusfsc.com,Vanguard 401(b),401(b),2011-09-27,
#
# Author: Marcelo Galvão
# Date: 04/09/2024

import pandas as pd
import json
import csv
from timeit import default_timer as timer
import argparse

parser = argparse.ArgumentParser("convert", description='Flatter CSV files with JSON to CSV normalized.')
parser.add_argument("source", help="csv source file", type=str)
parser.add_argument("target", help="csv target file", type=str)
args = parser.parse_args()

start = timer()
write_lines = 1

with open(args.target,'w') as f:
   writer = csv.writer(f)
   writer.writerow(['SubscriberKey', 'Id', 'EmailAddress', 'Name', 'FinancialAccountType', 'OpenDate', 'CloseDate'])
   for chunk in pd.read_csv(args.source, chunksize=100000):
      for i, row in chunk.iterrows():
         json_data = json.loads(row['FinancialAccount'])
         for item in json_data:
            write_lines += 1
            writer.writerow([row['SubscriberKey'], row['Id'], row['EmailAddress'], item['Name'], item['FinancialAccountType'], item['OpenDate'], item['CloseDate']])
      print(f'{i+1} lines read')
   end = timer()
   print(f'{write_lines} generated. Time spent: {end-start}')