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
        if sex == "male":
            result = 13.7 * float(weight) + 5.0 * float(height) - 6.8 * int(age) + 66
        elif sex == "female":
            result = 9.6 * float(weight) + 1.8 * float(height) - 4.7 * int(age) + 65
        else:
            print("please input the right sex")
            return 0
        print("Your BMR number is " + str(result))
        conflag = input("Do you want to try again?(y/n)")
        if conflag.lower() != 'y' and conflag.lower() != 'yes':
            flag = False
        print(conflag.lower())


if __name__ == '__main__':
    main()