#class

class Kullanici:
    #yapici fonksiyon
    def __init__(self, isim, yas):
      self.isim = isim
      self.yas = yas

    def selamla(self):
        print("Ooo, hosgeldin!Benim adim {isim} {yas} yaşındayım".format(isim=self.isim,yas=self.yas))

class Musteri(Kullanici):
    def __init__(self, isim, yas):
        super().__init__(isim, yas)
        self.bakiye = 0
    def bakiyemiSorgula(self):
        print(self.bakiye)
    def bakiyemiArttir(self):
        self.bakiye = self.bakiye + 10


kullanici1 = Kullanici("Turabi", 21)

print(kullanici1.isim)
kullanici1.selamla()

kullanici2 = Kullanici("Servan", 24)

kullanici2.selamla()

musteri1 = Musteri("selman", 30)

musteri1.bakiyemiArttir()
musteri1.bakiyemiSorgula()
print(musteri1.yas)
