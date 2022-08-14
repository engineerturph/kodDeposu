#def ve if

def toplam(sayi1, sayi2):
    return sayi1 + sayi2

print(toplam(1,3))
topladim = toplam(1,3)
print(topladim)

x = 36
if x > 20:
#True False üzerinden #: olunca ona göre blok oluşturur
    print("x 20 den büyüktür")
elif x < 15 :
    print("x 15 den küçüktür")
if x == 35: #elifse üstteki ifi yapar if se 2 sini birden
    print("x 35 dir")
elif x == 36:
    print("x 36 dır")
else:
    print("x 15 20 arasında")