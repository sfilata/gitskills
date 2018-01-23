"""
    This is the calculator of sum of money which is saved during 52 week
    Author sfilata
    Date Jan 23rd 2018
"""

def main():
    init = 10
    saveMoney = []
    sum = 0
    for item in range(52):
        saveMoney.append(init)
        sum += init
        init += 10
    # print(saveMoney)
    print("The sum of money saved is " + str(float('%.2f' % sum)))
    week = input("please input the week you want to check the money when:")
    print("The money when week No." + week + " is " + str(float('%.2f' % saveMoney[int(week) - 1])))



if __name__ == "__main__":
    main()