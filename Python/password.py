"""
    this is a program which can analyze the complexity of the password
    author: sfilata
    date: Jan 29th 2018
"""
import os

def main():
    fileFlow = open("output.txt", "r+")
    data = input("please input the password:")
    for item in range(5):
        level = 0
        if not data.isnumeric():
            level += 1
        if not data.isalpha():
            level += 1
        if len(data) > 7:
            level += 1
        if (level >= 3):
            print("The complexity of the password is " + str(level) + ". The examination is passed!")
            fileFlow.write("The password is <" + str(data) + ">. The complexity of the password is " + str(level) + ". The examination is passed!\n")
            break
        else:
            data = input("The complexity is too low, Please retry a password:")
            fileFlow.write("The complexity is too low, Please retry a password:\n")
    fileFlow.close();
    fileFlow = open("output.txt", "r")
    output = fileFlow.read()
    print(output)
    fileFlow.close();
        


if __name__ == '__main__':
    main()