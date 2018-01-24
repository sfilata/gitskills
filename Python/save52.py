"""
    This is the calculator of sum of money which is saved during 52 week
    Author sfilata
    Date Jan 23rd 2018
"""
import time
import datetime
# init the list of money saved every week
# amount, step
def initsaveMoney(amount, step):
    saveMoney = []
    init = step
    for item in range(amount):
        saveMoney.append(init)
        init += step
    return saveMoney

# calculate the sum of the all the money
def calculate(saveMoney):
    sum = 0
    for item in saveMoney:
        sum += item
    return sum

# set the money of the specified week
def setMoney(saveMoney, week, money):
    saveMoney[week] = money
    return saveMoney

def calculateWeek(day):
    temp = day - 1
    week = (temp // 7) + 1
    return week

def main():
    saveMoney = initsaveMoney(52, 10)
    sum = calculate(saveMoney)
    print("The sum of money saved is " + str(float('%.2f' % sum)))
    week = input("please input the week you want to check the money when:")
    print("The money when week No." + week + " is " + str(float('%.2f' % saveMoney[int(week) - 1])))
    # date = input("please input the date(like: 2018-01-20):")
    # day = time.strptime(date, "%Y-%m-%d")
    # print("The date is " + str(calculateWeek(day.tm_yday)) + "th week in current year!")
    # print("The Money should saved in " + str(calculateWeek(day.tm_yday)) + "th week is " + str(float('%.2f' % saveMoney[calculateWeek(day.tm_yday) - 1])))
    date = input("please input the date(like: 2018-01-20):")
    myDatetime = datetime.datetime.strptime(date, "%Y-%m-%d")
    print("The date is " + str(myDatetime.isocalendar()[1]) + "th week in current year!")
    print("The Money should saved in " + str(myDatetime.isocalendar()[1]) + "th week is " + str(float('%.2f' % saveMoney[myDatetime.isocalendar()[1] - 1])))



if __name__ == "__main__":
    main()