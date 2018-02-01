#coding=utf-8 
import requests 
import argparse 
import datetime 
import re 
from prettytable import PrettyTable 
from requests.packages.urllib3.exceptions import InsecureRequestWarning
now = datetime.datetime.now() 
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
  
tomorrow = now+datetime.timedelta(days=1)  
tomorrow = tomorrow.strftime('%Y-%m-%d') 
print(tomorrow) 
  
argument = argparse.ArgumentParser() 
argument.add_argument('--fromcity','-f',default='hangzhoudong') 
argument.add_argument('--tocity','-t',default='xiamen') 
argument.add_argument('--date','-d',default=tomorrow) 
# argument.add_argument('-d',action='store_true') 
args =argument.parse_args() 
  
from_station = args.fromcity 
to_station = args.tocity 
Date = args.date 
  
stationlist_url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9046'
r = requests.get(stationlist_url, verify=False) 
r.encoding = 'UTF-8'
stationlist = r.content 
  
ToStation = '宝鸡' 
FromStation = '杭州' 

# print(stationlist)
   
# placea = stationlist.find(from_station) 
# placeb = stationlist.find(to_station) 
  
# for i in range(-4,-1): 
#   FromStation += stationlist[placea+i] 
# for i in range(-4,-1): 
#   ToStation += stationlist[placeb+i] 
  
query_url='https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date='+Date+'&leftTicketDTO.from_station=BJY&leftTicketDTO.to_station=HZH&purpose_codes=ADULT'
r = requests.get(query_url,verify=False) 
r.encoding = 'UTF-8'
  
with open('json.txt','w') as fp: 
   fp.write(str(r.json())) 
  
if 'result' in r.json()["data"]: 
  rj = r.json()["data"]["result"] 
  pt = PrettyTable() 
  
  header = '车次 出发 上车时间 下车时间 总耗时 日期 硬座 硬卧 软卧 二等座 一等座 商务座'.split() 
  pt._set_field_names(header) 
  
  for x in rj: 
    ptrow = [] 
    item = x.split("|")
    print(item)
    ptrow.append(item[3]) 
    ptrow.append(item[6])
    ptrow.append(item[8])
    ptrow.append(item[9])
    ptrow.append(item[10]) 
    ptrow.append(item[14]) 
    ptrow.append(item[15])
    ptrow.append(item[-9])
    ptrow.append(item[-14])
    ptrow.append(item[-7])
    ptrow.append(item[-6])
    ptrow.append(item[-5])
    pt.add_row(ptrow) 
  print(pt) 
else : 
  print('这两个站点没有直达列车')