# if ve elif


is_male = True


if is_male:
    print("You are male")
else:
    print("You are not")


#or ve and kullanılabilir not da kullanibilir not olunca parantez


#karşılaştırma


def max_num(num1, num2, num3):
    if num1 >= num2 and num1 >= num3:
        return num1
    elif num2 >= num1 and num2 >= num3:
        return num2
    else:
        return num3

print(max_num(1, 2, 3))

#while loop
i = 1.0
while i <= 10:
    print(i)
    i = i + 1
