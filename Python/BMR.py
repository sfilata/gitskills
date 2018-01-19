"""
    author: sfilata
    function: BMR calculator (Run always)
    version: 1.0
    date: 2018.1.19  
"""


def calculate(weight, height, age, sex):
    if sex == "male":
        result = 13.7 * float(weight) + 5.0 * float(height) - 6.8 * int(age) + 66
    elif sex == "female":
        result = 9.6 * float(weight) + 1.8 * float(height) - 4.7 * int(age) + 65
    else:
        print("please input the right sex")
        return -1
    return result


def main():
    flag = True
    while flag:
        # sex = "male"
        sex = input("Please input your sex(male or female):")
        # weight = 80
        weight = input("Please input your weight(kg):")
        # height = 178
        height = input("Please input your height(cm):")
        # age = 23
        age = input("Please input your age:")
        result = calculate(weight, height, age, sex)
        if result != -1:
            print("Your BMR number is " + str(result))
        confirm = input("Do you want to try again?(y/n)")
        if confirm.lower() != 'y' and confirm.lower() != 'yes':
            flag = False
        print(confirm.lower())


if __name__ == '__main__':
    main()
