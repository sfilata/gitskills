# This is a program who can change USD to CNY or reverse
data = input('Please input the money you want to convert!')
item = data[-3:]
rate = 6.67
if item == 'CNY':
    resultNum = float(data[:-3]) / rate
	resultNum = round(resultNum, 2)
	result = str(resultNum) + 'USD'
elif item == 'USD':
	resultNum = float(data[:-3]) * rate
	resultNum = round(resultNum, 2)
	result = str(resultNum) + 'CNY'
else:
	print('This money type is not supported!')

print('The money you want to convert is ' + result)
