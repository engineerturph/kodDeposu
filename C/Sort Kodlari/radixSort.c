#include <stdio.h>

int bucketSort(int bas,int a[],int n);
// 0 sayisi haric sortlar
int main(){
	int b[5],a[5] = {0,0,0,0,0},bas=0,bEn=1,on=1,i;
	int n = sizeof(a)/sizeof(a[0]);
	for(i=0;i<n;i++){
		scanf("%d",&a[i]);
	}
	for(i=0;i<n;i++){
		b[i]=a[i];
		while(b[i]>0){
			b[i]=(b[i]/on)%10;
			bas++;
			on=on*10;
			if(bas>bEn){
				bEn=bas;
			}
		}
	}
	for(i=1;i<bEn;i++){
		bucketSort(i,a,n);
	}
	for(i=0;i<n;i++){
		printf(" %d ",a[i]);
	}
	return 0;
}

int bucketSort(int bas,int a[],int n){
	// ilerde 3. argumenti silersem daha guzel bir kod olur.
	// radix sort icin yazilmistir,bucket icinde sortlamiyor sortlarsa normal bucket sort olur.
	// bas variable i ilerde radixten alinacak.
	int c=0,i,on,kume[10],bucket[10][50],j,oSayi;
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
	for(i=0;i<n;i++){
		oSayi=(a[i]/on)%10;
		bucket[oSayi][kume[oSayi]]=a[i];
		kume[oSayi]++;
	}
	
	for(i=0;i<10;i++){
		for(j=0;j<50;j++){
			if(bucket[i][j]!=0){
				a[c] = bucket[i][j];
				c++;
			}
		}
	}
	return 0;
}
