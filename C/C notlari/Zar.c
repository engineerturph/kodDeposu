#include<stdio.h>
#define MAX 6000
int main() {
	int l=1;
	do{
	int dizi[6]={0};
	int i,j,k,z;
	srand(z);//Diger random sayilar ilk random sayiya gore degisir srand da ilk sayiyi degistirir.
	for(i=0;i<MAX;i++){
		dizi[rand() % 6]++;
	}
	for(i=0;i<6;i++){
		k=0;
		for(j=0;j<dizi[i];j++){
			k++;
		}	if(k==1000){
			l=0;
		}
		printf("%d ",k);
	}
	printf("\n");
	z++;}
	while(l==1);
	return 0;
}
