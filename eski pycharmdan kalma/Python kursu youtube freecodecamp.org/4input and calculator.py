#getting input
"""
name = input("Enter your name: ")
age = input("Enter your age: ")

print("Merhaba {name} {age}!".format(name = name,age=age))
"""
#calculator


number1 = float(input("numara 1: "))
number2 = float(input("numara 2: "))
islem = input("işlem: ")


if islem == "+":    #int yazarsan tam sayı arar
    result = number1 + number2
    print(result)
elif islem == "-":
    result = number1 - number2
    print(result)
elif islem == "*":
    result = number1 * number2
    print(result)
elif islem == "/":
    result = number1 / number2
    print(result)
else:
    print("error")


