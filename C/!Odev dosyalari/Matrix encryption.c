#include <stdio.h>

int main(){
	int i,j,k=0,numberOfColumns,numberOfRows;
	char text[30][30];
	printf("Enter the number of rows\n");
	scanf("%d", &numberOfRows);
	printf("Enter the number of columns\n");
	scanf("%d", &numberOfColumns);
	for(i=0;i<numberOfRows;i++){
		for(j=0;j<numberOfColumns;j++){
			k++;
			printf("Enter the %d th character:",k);
			scanf("%c", &text[i][j]);
		}
	}
	for(i=0;i<numberOfColumns;i++){
		for(j=0;j<numberOfRows;j++){
			printf("%c", &text[i][j]);
		}
	}
return 0;
}
