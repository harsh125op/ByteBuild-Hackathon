
#include<stdio.h>
#include<string.h>
#include<stdlib.h>

struct securityguard{
    char name[50];
    char address[100];
    char phone[10];
    char email[50];
    char previous_place[50];
    int years_of_experience;
    char current_deployment[20]; 
    char city[60];
    char country[60];
    double Latitude;
    double Longitude;
};
typedef enum{ ADMIN, POLICE, SOCIETY_OWNER, FIELD_USER, UNKNOWN }Role;
struct User {
    char username[50];
    Role role;
};
struct User users[100] = {
    {"admin", ADMIN},
    {"police", POLICE},
    {"owner", SOCIETY_OWNER},
    {"fielduser", FIELD_USER}
};

void parseLocation(struct securityguard *sg, char *buffer) {
    sscanf(strstr(buffer, "\"city\":\"") + 8, "%[^\"]", sg->city);
    sscanf(strstr(buffer, "\"country\":\"") + 11, "%[^\"]", sg->country);
    sscanf(strstr(buffer, "\"lat\":") + 6, "%lf", &sg->Latitude);
    sscanf(strstr(buffer, "\"lon\":") + 6, "%lf", &sg->Longitude);
}
void printGuards(struct securityguard sg[], int count) {
    printf("\n--- Security Guards' Location Data ---\n");
    for (int i = 0; i < count; i++) {
        printf(" Name: %s\n", sg[i].name);
        printf("Location: %s, %s\n", sg[i].city, sg[i].country);
        printf("Coordinates: Latitude: %lf, Longitude: %lf\n",sg[i].Latitude, sg[i].Longitude);
    }
}
Role getUserRole(char *username,int n) {
    for (int i = 0; i < n; i++) {
        if (strcmp(username, users[i].username) == 0) {
            return users[i].role;
        }
    }
    return UNKNOWN;  
}

int main(){
    struct securityguard sg[100];
    int n;
    printf("Enter the number of security guards: ");
    scanf("%d", &n);
    for(int i=0; i<n; i++){
        printf("Enter the name of the security guard: ");
        scanf("%s", sg[i].name);
        printf("Enter the address of the security guard: ");
        scanf("%s", sg[i].address);
        printf("Enter the phone number of the security guard: ");
        scanf("%s", sg[i].phone);
        printf("Enter the email of the security guard: ");
        scanf("%s", sg[i].email);
        printf("Enter the previous place of the security guard: ");
        scanf("%s", sg[i].previous_place);
        printf("Enter the years of experience of the security guard: ");
        scanf("%d", &sg[i].years_of_experience);
        printf("Enter the current deployment of the security guard: ");
        scanf("%s", sg[i].current_deployment);
		system("curl -s http://ip-api.com/json > location.json");
		
}
   
	char username[50];
    printf("option:\n1.admin\n2.police\n3.owner\n4.fielduser\nEnter your username:");
    scanf("%s", username);
    Role userRole = getUserRole(username,n);

	printf("\n The details of the security guards are: \n");
    for(int i=0; i<n; i++){
        printf("Name: %s\n", sg[i].name);
        printf("Address: %s\n", sg[i].address);
        printf("Phone: %s\n", sg[i].phone);
        printf("Email: %s\n", sg[i].email);
        printf("Previous Place: %s\n", sg[i].previous_place);
        printf("Years of Experience: %d\n", sg[i].years_of_experience);
        printf("Status: %s\n", sg[i].current_deployment);
		printf("tracked location is saved to location.json\n");
		system("curl -s http://ip-api.com/json > location.json");
		FILE *file = fopen("location.json", "r");
        if (!file) {
            printf("Error: Cannot open location.json\n");
            return 1;
        }
        char buffer[1024];
        fread(buffer, sizeof(buffer), 1, file);
        fclose(file);
        parseLocation(&sg[i], buffer);	
    }

		printGuards(sg, n);

    switch (userRole) 
	{
        case ADMIN:
            printf("Admin Access: Manage guards & assign duties.\n");
            break;
        case POLICE:
            printf("Police Access: View & verify guards.\n");
            break;
        case SOCIETY_OWNER:
            printf("Society Owner Access: View guards & report issues.\n");
            break;
        case FIELD_USER:
            printf("Field User Access: View only personal duty.\n");
            break;
        default:
            printf("Access Denied: Unknown user.\n");
            break;
    }

    return 0;

}