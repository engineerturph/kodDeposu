#include <stdio.h>
int main(){
	srand(time(NULL));
	int i, j=52,r,c=0;
	int visited[52]={0};
	int dizi[52] = {0};
	
	i=0;
	while(i<52){
		r=rand()%52;
		c++;
		if(visited[r]==0){
			dizi[i]=r;
			visited[r]=1;
			printf("dizi-%d=%d\n",i,dizi[i]);
			i++;
			
		}
	}
	printf("Toplam rand cagrisi=%d",c);
	return 0;
}
