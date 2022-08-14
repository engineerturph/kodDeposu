#include <stdio.h>
#define MATRIS 5
void matrisYazdir(int matris[][MATRIS]);
void matrisAl(int matris[][MATRIS]);
int yolBul(int matris[][MATRIS],int rota[]);
int arrYazdir(int arr[],int uzunluk);

int main(){
	int matris[MATRIS][MATRIS] = {{0}},rota[MATRIS * MATRIS]={0};
	matrisAl(matris);
	yolBul(matris,rota);
	arrYazdir(rota,MATRIS*MATRIS);
	return 0;
}

int arrYazdir(int arr[],int uzunluk){
	int i;
	for(i=0;i<uzunluk;i++){
		if(arr[0]==0){
			printf("rota yok");
		}
		if(arr[i]==0){
			return -1;
		}
		printf("%d ",arr[i]);
	}
}

void matrisYazdir(int matris[][MATRIS]){
	int i,j;
	for(i=0;i<MATRIS;i++){
		for(j=0;j<MATRIS;j++){
			printf("%d/",matris[i][j]);
		}
		printf("\n");
	}
}

void matrisAl(int matris[][MATRIS]){
	int i,j;
	for(i=0;i<MATRIS;i++){
		for(j=0;j<MATRIS;j++){
			printf("%d.Elementi giriniz\n",i*4+j+1);
			do{
			scanf("%d",&matris[i][j]);}
			while(matris[i][j]!=0 && matris[i][j]!=1);
			matrisYazdir(matris);
		}
		
	}
}

int yolBul(int matris[][MATRIS],int rota[]){
	int i=0,j=0,k=0;
	while(i<MATRIS-1 || j<MATRIS-1){
		if(matris[j][i+1]==1 && i!=MATRIS-1){
			i++;
			rota[k]++;
			k++;
		}
		else if(matris[j+1][i]==1 && j!=MATRIS-1){
			j++;
			rota[k]+=2;
			k++;
		}
		else{
			return -1;
		}
		
	}
}
