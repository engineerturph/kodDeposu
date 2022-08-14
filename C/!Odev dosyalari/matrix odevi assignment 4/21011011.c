#include <stdio.h>

int main(){
	int n,m,i,j;
	printf("Satir sayisini giriniz:");
	scanf("%d",&n);
	printf("Sutun sayisini giriniz:");
	scanf("%d",&m);
	int matrix[n][m],hepsiSifir[n];
	for(i=0;i<n;i++){
		for(j=0;j<m;j++){
			do{
			printf("%d. sutundaki %d. satirdaki sayiyi giriniz:",i+1,j+1);
			scanf("%d",&matrix[i][j]);
			if(matrix[i][j]!=1&&matrix[i][j]!=0){
				printf("Invalid number\n");
			}
			}
			while(matrix[i][j]!=1&&matrix[i][j]!=0);
		}
	}
	for(i=0;i<n;i++){
		hepsiSifir[i]=1;
		printf("|");
		for(j=0;j<m;j++){
			printf("%d|",matrix[i][j]);
			if(matrix[i][j]==1){
				hepsiSifir[i]=0;
			}
		}
		printf("\n");
	}
	for(i=0;i<n;i++){
		if(hepsiSifir[i]==1){
			printf("Bos olan satir:%d\n",i+1);
		}
	}
	return 0;
	
}
