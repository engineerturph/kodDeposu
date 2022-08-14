#2**3 = 2^3

def raise_to_power(base_num,pow_num):
    result=1
    for power in range(pow_num):
        result *= base_num
    return result
print (raise_to_power(2,3))


#forla üs alma

#nested for (iç içe for)

number_grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0]
]
for row in number_grid:
    for col in row:
        print(col)

"""
Giraffe Translator
vowels = g
"""

def translate(word):
  translation = ""
  for letter in word:
    if letter.lower() in "aeiou":
        if letter.isupper():
            translation = translation + "G"
        else:
            translation = translation + "g"
    else:
      translation = translation + letter
  return translation

print(translate(input("Bir kelime giriniz: ")))


#isupper yüksekmi diye bakıyor