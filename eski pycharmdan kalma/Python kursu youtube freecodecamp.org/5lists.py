#listeler == [] allows duplicate

friends = ["kevin", "karen", "jim", "turabi"]
numbers = [1, 2, 3, 4, 5]
numbers[2] = 12

print(friends)
print(friends[-1])
print(friends[1:3]) #1: olursa 1 den sonrası
print(friends.index("kevin")) #kaçıncı sırada
print(friends.count("ji")) #kaç tane var

friends.extend(numbers) #listeleri ekler
#append sondan item ekler
#insert istediğin yerden ekler
friends.remove("jim")
item = friends.pop() #removes and returns last element
#.sort alfabeye göre dizer reverse tersine çevirir .sort(reverse)
# de olur
#.copy kopyalar

#tuples (değiştirilemez) (list içine yazılabilir)
"""
coordinates = (3, 2)
print(coordinates[1])
"""

print(item)