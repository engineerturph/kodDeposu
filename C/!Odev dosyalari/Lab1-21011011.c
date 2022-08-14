#include <stdio.h>
#define MAXSIZE 100

void kontrolSifirla(int dizi[MAXSIZE]);
void printMagicalNumbers(int dizi[MAXSIZE], int n,int kontrol[MAXSIZE]);

int main(){
	int diziUzunlugu,i;
	printf("Dizi uzunlugu giriniz.(Dizi uzunlugu max 100 olabilir)\n");
	scanf("%d",&diziUzunlugu);
	if(diziUzunlugu>100){
		return 0;
	}
	int dizi[diziUzunlugu],kontrol[MAXSIZE];
	for (i=0;i<diziUzunlugu;i++){
		printf("%d. elemani giriniz.(Sayi buyuklugu max 99 olabilir)\n",i+1);
		scanf("%d",&dizi[i]);
		if(dizi[i]>100){
			return 0;
		}
	}
	kontrolSifirla(kontrol);
	printMagicalNumbers(dizi,diziUzunlugu,kontrol);
	return 0;
}

void kontrolSifirla(int dizi[MAXSIZE]){
	int i;
	for(i=0;i<MAXSIZE;i++){
		dizi[i]=0;
	}
}

void printMagicalNumbers(int dizi[MAXSIZE], int n,int kontrol[MAXSIZE]){
	int i;
	for(i=0;i<n;i++){
		kontrol[dizi[i]]++;
	}
	printf("Sihirli sayilar:\n");
	for(i=1;i<MAXSIZE;i++){
		if(kontrol[i]==i){
			printf("%d ",i);
		}
	}
}
