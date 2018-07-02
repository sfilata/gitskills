"""
    author: sfilata
    function: crap simulation
    version: 1.0
    date: 2018.2.1
"""
import random


def main():
    data = []
    number = 3
    for item in range(number):
        data.append(random.randint(1, 6))
    result = zip(range(number), data)
    # print(result)
    for index, item in result:
        print("The number of crap No." + str(index + 1) + " is " + str(item))
        # print("The number of crap No." + str(item) + " is " + str(result[item]))
    # print("The number of crap No.1 is " + str(data) + ", The number of crap No.2 is " + str(data2))



if __name__ == '__main__':
    main()