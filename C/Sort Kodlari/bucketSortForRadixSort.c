#include <stdio.h>

int main(){
	// radix sort icin yazilmistir,bucket icinde sortlamiyor sortlarsa normal bucket sort olur.
	// bas variable i ilerde radixten alinacak.
	int N=10;
	int bas = 1,a[N],i,on,kume[10],bucket[10][50],j,oSayi;
	for(i=0;i<N;i++){
		scanf("%d",&a[i]);
	}
	on=1;
	for(i=1;i<bas;i++){
		on = on*10;
	}
	for(i=0;i<10;i++){
		kume[i]=1;
	}
	for(i=0;i<10;i++){
		for(j=0;j<50;j++){
			bucket[i][j]=0;
		}
	}
	for(i=0;i<N;i++){
		oSayi=(a[i]/on)%10;
		bucket[oSayi][kume[oSayi]]=a[i];
		kume[oSayi]++;
	}
	for(i=0;i<10;i++){
		for(j=0;j<50;j++){
			if(bucket[i][j]!=0){
				printf(" %d ",bucket[i][j]);
			}
		}
	}
	return 0;
}
