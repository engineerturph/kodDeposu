
try:
    number = int(input("Enter a name: "))
    print(number)


# Specific Error (general errors are not good)
except ZeroDivisionError:
    print("error")
except ValueError:
    print("Invalid input")


