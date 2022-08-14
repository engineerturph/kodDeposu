#class functions


class student:
    def __init__(self, name, major, gpa):
        self.name = name
        self.major = major
        self.gpa = gpa

    def on_honor_roll(self):
        if self.gpa >= 3.5:
            return True
        else:
            return False


student1 = student("turabi", "engineer", 3.9)


print(student1.on_honor_roll())


#class inheritance


class chef:
    def makechicken(self):
        print("chef makes chicken")
    def makeegg(self):
        print("chef makes egg")


chef1 = chef()
chef1.makechicken()


class cheff(chef):
    def bebitch(self):
        print("??????")
    def makeegg(self):
        print("i cant make egg")


cheff1 = cheff()
cheff1.makeegg()
cheff1.makechicken()
