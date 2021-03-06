"""
    this is a program which can count day in a year
    author: sfilata
    date: Jan 25th 2018
"""

import datetime

def isLeapYear(year):
    if (year % 4 == 0):
        if (year % 100 == 0):
            if (year % 400 == 0):
                return True
            else:
                return False
        else:
            return True
    else:
        return False


def initYearDic(isLeapYear):
    # result = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    result = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    if (isLeapYear):
        # result = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        result[2] = 29
    else:
        # result = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        pass
    return result

def calculateDay(inputYear):
    MytupleList = inputYear.split("/")
    Mytuple = initYearDic(isLeapYear(int(MytupleList[0])))
    # print(Mytuple)
    sum = 0
    if (int(MytupleList[1]) > 1):
        for item in range(int(MytupleList[1]) - 1):
            sum += Mytuple[item + 1]
    sum += int(MytupleList[2])
    return sum

def main():
    # inputYear = input("please input the date you want to count day(like:2018/01/20):")
    # print("The date is the " + str(calculateDay(inputYear)) + "th day in this year!")
    print(datetime.date.timetuple(datetime.datetime(2014, 4, 21)).tm_yday)

if __name__ == "__main__":
    main()