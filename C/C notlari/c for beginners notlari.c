#include <stdio.h>
#include <stdlib.h>
#include <math.h>
double cube(double num);

struct Student{
	char name[50];
	char major[50];
	int age;
	double gpa;
};
int main()
{
    // Data Types 
	//(short int long int de var)(short int normal int uzunlugunda long int ise daha fazla sayi var)
    /*
	int age = 40;
    double gpa = 40.0; // can store 64 bits
    float gpa2 = 3.7;
    char grade = 'a';
    char isim[] = "Turabi";
    
    // Print
    printf("My favorite %s is %d\n","number", 500);
    // %s string %f float %d int %c character %x hexadecimal %lf long float
    
    // Math functions
    // pow() ussunu alir sqrt() karekokunu alir ceil() uste yuvarlar floor() alta yuvarlar
    printf("%f\n", pow(4,3));
    
    //Constants
    const int NUM = 5;
    int const NUM2 = 3;
    // bunlar degistirilemez ve constantlar genelde buyuk yazilir
    // bir variable da olmayan verilerde constant olur.
    printf("%d\n", 5);// 5 burda constant
    
    // Input
    char isimim[100];
    printf("Bir isim giriniz: ");
    scanf("%s", isimim); // 2. yere memory pointerini yazion 1. yerde de alcagin seyin tipini
    printf("Your name is %s\n", isimim);
    // scanf yerine fgets(var, char limit, stdin) tum cumleyi alir(en sonda \n alir)(bu yuzden sonda kullanmak iyi)
    
    // Hesap makinesi 1
    double num1,num2;
    printf("Enter first number: ");
    scanf("%lf", &num1);
    printf("Enter second number: ");
    scanf("%lf", &num2);
    
    printf("Answer: %f", num1+num2);//printte lf kullanmaya gerek yok
    
    // Arrays
    // luckynumbers[] olmaz icine kac tane oldugunu soylemen lazim
    
    int luckyNumbers[] = {4,8,3,2,1,5,7,5,5};
    luckyNumbers[1] = 99;
    printf("%d", luckyNumbers[1]);
    */
    
    //Functions (mainin icine yazmana gerek yok ama main disina yazarsan scope sikintilari yasayabilirsin.
    //Scope sikintisi ise argumentlerle cozulebilir.
    // Parameter icine arr[] yazilabilir
    // parameter intsiz felan da cozulebilir.Heralde direk a ya constanti yerlestiriyor
    // %s diyince farkli bir sekilde arrayin memorysini yazarsen direk arrayi yazdiriyor.
    
    //Return Statement
    /*
    printf("Answer = %f",cube(3.0));
    */
    // returnden sonraki kodlar calismaz
    // prototypeing yaparsan intten sonra da functioni yazabilirsin(onceden functionu definelarsan)
    
    //Switch statements
    // If gibi ama bir valueyu birsuru valueyla karsilastirirsin
    /*
char grade = 'A';
switch(grade){
	case 'A':
		printf("You did great! ");
		break;
	case 'B':
		printf("well");
		break;
	default: //bunlarin arasinda olmayan bir deger girersen
		printf("Invalid value")
*/

	//Struct
	// struct icinde hem int hem char hem cart hem curt saklanabilir.
	/*
	struct Student student1;
	student1.age = 22;
	student1.gpa = 3.2;
	strcpy(student1.name, "Jim");
	strcpy(student1.major, "dick");
	
	printf("%s", student1);
	*/
	
	//Two dimensional arrays
	//Defineladiktan sonra elementlerin ne oldugunu yazabilirsin
	/*
	int nums[3][2] = {
					{1,2},
					{3,4},
					{5,6}
	};
	int i,j;
	for(i = 0;i<3;i++){
		for(j=0;j<2;j++){
			printf("%d\n",nums[i][j]);
		}
	}
	*/
	
	//Memory adresses
	// Declarelerken(solda) yildizi pointer oldugunu anlatmak icin 
	// sagda ise pointledigi yeri belirtmek icin kullanion
	int age = 30;
	int *pAge = &age; // Bu sekilde memory adressini storelayabilirsin.
	char nameFL = 'T';
	char *pNameFL = &nameFL; // Charin memorysini char olarak saklarsin
	printf("age: %d\n", a);
	return 0;
}


double cube(double num){
	return num * num * num;
}

