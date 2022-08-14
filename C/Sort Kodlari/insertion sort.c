#include <stdio.h>

int main(){
	int N = 10;
	int i,a[N],z,temp;
	for(i=0;i<N;i++){
		scanf("%d",&a[i]);
	}
	for(i=0;i<N-1;i++){
		if(a[i]>a[i+1]){
			z=i;
			while(a[z]>a[z+1]){
				temp=a[z+1];
				a[z+1]=a[z];
				a[z]=temp;
				z--;
			}
		}
	}
	for(i=0;i<N;i++){
		printf(" %d ",a[i]);
	}
	return 0;
}
