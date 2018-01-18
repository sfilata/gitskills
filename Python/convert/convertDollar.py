# this is a program that can convert dollar to RMB or the other
# author Sfilata 2018/1/15

testData = input('Please input the Money you want to convert!($x.xx or $x.xx)')
result = 0
rate = 6.4326
if testData[0] == '$':
    result = float(testData[1::]) * rate
    print('You got ￥' + str(result))
else:
    result = float(testData[1::]) / rate
    print('You got $' + str(result))
