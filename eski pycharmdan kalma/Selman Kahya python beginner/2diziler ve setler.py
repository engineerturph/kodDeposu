#diziler
sayilar = [1, 2, 3, 4, 5, 6]
meyveler = ["elma", "armut"]

sayilar.append(7)  #ekleme
meyveler.remove("elma")  #çıkarma
meyveler.insert(0, "karpuz")  #istediğin yere ekleme
"""
meyveler.sort()  #diz
meyveler.reverse()  #tersine
"""
meyveler.sort(reverse=True)#2si birden

print(sayilar[0])

print(len(sayilar))  #length

print(meyveler)


#setler(küme)

kume = {1, 2, 3}
kume.add(1)
kume.remove(3)

print(kume)

#sözlük

insanlar = { "ilk_isim" : "turabi",
          "soy_isim" : "yıldırım",
          "yas" : 30 }

del(insanlar["yas"])
print(insanlar["ilk_isim"])
print(insanlar.get("ilk_isim"))
print(insanlar)

