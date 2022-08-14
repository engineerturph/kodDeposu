#read
# r: read, w: write a: append(ekle) r+: hepsi

textf = open("Text.txt", "r")
#.read okur .readline 1 line okur .readlines hepsini kümeye alır
#1 kere okuyunca fareyi orada bırakır ve devamını okumaz
#seek(0) ile başa dönülebilir line sonunda \n var ve onu 2 harf
#sayar seek ile harf sayısıyla dönülebilir
print(textf.readable())

for txxt in textf.readlines():
    print(txxt)
textf.seek(0)
print(textf.readlines())
textf.close()

#wriding and appending

textf = open("site.html", "a")
textf.write("\n<p>This is HTML<p>")
textf.close()

"""
textf = open("site.html", "a")
textf.write("\nsadgasdsad")
textf.close()
"""