print("Giraffe\nAcademy")#yeni satır
print("Giraffe\"Academy")#" yazmak için

phrase = "Giraffe Academy"
print(phrase.lower().isupper())
#phrase upper büyütür
#.isupper upper mı diye soruyor true false diyor

print(len(phrase))
#harf sayısı

print(phrase[1])
#belirli bir harfi alma

print(phrase.index("iraffe"))
#harfin bulunduğu yeri bulma

print(phrase.replace("Giraffe", "Elephant"))
#değiştirme