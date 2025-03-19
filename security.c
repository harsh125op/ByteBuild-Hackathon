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
typedef struct {
    int id;
    char name[50];
    char address[100];  
    char location[50];
	char requester[50]; 
    char status[20];
    int shiftAssigned;  
    int checkedIn;  
} Guard;


Guard guards[100];  
int count = 0; 
int guardCount = 0;

struct findguard {
    int id;
    int location;
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
void assignGuard(int n) {
    if (count >= n) {
        printf(" No more guards can be added!\n");
        return;
    }

    guards[count].id = count + 1;  
    printf("Enter Guard Name: ");
    scanf(" %[^\n]", guards[count].name);
    printf("Enter Guard Address: ");  
    scanf(" %[^\n]", guards[count].address);
    printf("Enter Duty Location: ");
    scanf(" %[^\n]", guards[count].location);

    printf(" Guard %s assigned to %s (ID: %d)\n", guards[count].name, guards[count].location, guards[count].id);
    count++;
}


void displayGuards() {
    if (count == 0) {
        printf(" No guards assigned yet.\n");
        return;
    }

    printf("\n List of Guards on Duty:\n");
    for (int i = 0; i < count; i++) {
        printf("ID: %d, Name: %s, Address: %s, Location: %s\n", 
               guards[i].id, guards[i].name, guards[i].address, guards[i].location);
    }
}
void requestVerification(int n) {
    if (count >= n) {
        printf(" Maximum guard limit reached!\n");
        return;
    }

    Guard g;
    printf("\nEnter Guard ID: ");
    scanf("%d", &g.id);
    printf("Enter Guard Name: ");
    getchar(); 
    fgets(g.name, sizeof(g.name), stdin);
    g.name[strcspn(g.name, "\n")] = '\0';

    printf("Enter Requester Type (Police / Business / Resident): ");
    fgets(g.requester, sizeof(g.requester), stdin);
    g.requester[strcspn(g.requester, "\n")] = '\0';

    strcpy(g.status, "Pending"); 

    guards[count++] = g; 
    printf("Guard verification request submitted successfully!\n");
}
void updateStatus() {
    if (count == 0) {
        printf(" No guard records found!\n");
        return;
    }

    int id, found = 0;
    char newStatus[20];

    printf("\nEnter Guard ID to update status: ");
    scanf("%d", &id);

    for (int i = 0; i < count; i++) {
        if (guards[i].id == id) {
            printf("Current Status: %s\n", guards[i].status);
            printf("Enter new status (Approved / Rejected): ");
            getchar();
            fgets(newStatus, sizeof(newStatus), stdin);
            newStatus[strcspn(newStatus, "\n")] = '\0';

            strcpy(guards[i].status, newStatus);
            found = 1;
            printf("Status updated successfully!\n");
            break;
        }
    }

    if (!found)
        printf(" Guard ID not found!\n");
}
void displayRequests() {
    if (count == 0) {
        printf(" No guard records found!\n");
        return;
    }

    printf("\n  Guard Verification Requests :\n");
    printf("%-5s %-20s %-20s %-10s\n", "ID", "Name", "Requester", "Status");
    printf("\n");

    for (int i = 0; i < count; i++) {
        printf("%-5d %-20s %-20s %-10s\n", guards[i].id, guards[i].name, guards[i].requester, guards[i].status);
    }
}
void addGuard(int n) {
    if (guardCount < n) {
        printf("Enter Guard ID: ");
        scanf("%d", &guards[guardCount].id);
        printf("Enter Guard Name: ");
        scanf(" %[^\n]", guards[guardCount].name);
        guards[guardCount].shiftAssigned = 0;
        guards[guardCount].checkedIn = 0;
        guardCount++;
        printf("Guard added successfully!\n");
    } else {
        printf("Max guard limit reached!\n");
    }
}

void assignShift() {
    int id;
    printf("Enter Guard ID to assign shift: ");
    scanf("%d", &id);

    for (int i = 0; i < guardCount; i++) {
        if (guards[i].id == id) {
            guards[i].shiftAssigned = 1;
            printf("Shift assigned to %s\n", guards[i].name);
            return;
        }
    }
    printf("Guard not found!\n");
}

void checkIn() {
    int id;
    printf("Enter Guard ID to check-in: ");
    scanf("%d", &id);

    for (int i = 0; i < guardCount; i++) {
        if (guards[i].id == id && guards[i].shiftAssigned == 1) {
            guards[i].checkedIn = 1;
            printf("%s checked in successfully!\n", guards[i].name);
            return;
        }
    }
    printf("Guard not found or shift not assigned!\n");
}

void checkOut() {
    int id;
    printf("Enter Guard ID to check-out: ");
    scanf("%d", &id);

    for (int i = 0; i < guardCount; i++) {
        if (guards[i].id == id && guards[i].checkedIn == 1) {
            guards[i].checkedIn = 0;
            printf("%s checked out successfully!\n", guards[i].name);
            return;
        }
    }
    printf("Guard not found or not checked in!\n");
}

void checkAbsentGuards() {
    printf("\n Absent Guards \n");
    int absentCount = 0;
    for (int i = 0; i < guardCount; i++) {
        if (guards[i].shiftAssigned == 1 && guards[i].checkedIn == 0) {
            printf("ALERT: Guard %s (ID: %d) is absent!\n", guards[i].name, guards[i].id);
            absentCount++;
        }
    }
    if (absentCount == 0) {
        printf("No absent guards.\n");
    }
}

void display() {
    printf("\n Guard List \n");
    if (guardCount == 0) {
        printf("No guards added yet.\n");
        return;
    }
    for (int i = 0; i < guardCount; i++) {
        printf("ID: %d, Name: %s, Shift Assigned: %s, Checked In: %s\n",
               guards[i].id, guards[i].name,
               guards[i].shiftAssigned ? "Yes" : "No",
               guards[i].checkedIn ? "Yes" : "No");
    }
}

int findNearestGuard(struct findguard guards[], int n, int incident_location) {
    int nearest_index = 0;
    int min_distance = abs(guards[0].location - incident_location);

    for (int i = 1; i < n; i++) {
        int distance = abs(guards[i].location - incident_location);
        if (distance < min_distance) {
            min_distance = distance;
            nearest_index = i;
        }
    }
    return nearest_index;
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

	int choice;
    printf("Assigning guard:");
	while (1) {
        printf("\n Security Guard Duty System \n");
        printf("1. Assign New Guard\n");
        printf("2. Display All Guards\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                assignGuard(n);
                break;
            case 2:
                displayGuards();
                break;
            case 3:
                printf("Exiting program.\n");
                return 0;
            default:
                printf(" Invalid choice. Try again.\n");
        }
    }
	int option;
    while (1) {
        printf("\n Guard Verification System");
        printf("\n1 Request Background Verification");
        printf("\n2 Update Verification Status");
        printf("\n3 Display All Requests");
        printf("\n4 Exit");
        printf("\nEnter your choice: ");
        scanf("%d", &option);

        switch (option) {
            case 1: requestVerification(n);
			        break;
            case 2: updateStatus();
			        break;
            case 3: displayRequests();
			        break;
            case 4: exit(0);
            default: printf(" Invalid choice! Try again.\n");
        }
    }
    
    int Choice;
    while (1) {
        printf("\n Security Guard Management \n");
        printf("1. Add Guard\n");
        printf("2. Assign Shift\n");
        printf("3. Check-in Guard\n");
        printf("4. Check-out Guard\n");
        printf("5. Check Absent Guards\n");
        printf("6. Display Guards\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &Choice);

        switch (Choice) {
            case 1: addGuard(n); 
                    break;
            case 2: assignShift(); 
                    break;
            case 3: checkIn(); 
                    break;
            case 4: checkOut(); 
                    break;
            case 5: checkAbsentGuards();
                    break;
            case 6: display(); 
                    break;
            case 7: printf("Exiting...\n"); 
                    return;
            default: printf("Invalid choice! Try again.\n");
        }
    }
    
    struct findguard guards[3] = { {101, 10}, {102, 20}, {103, 30} };  
    int incident_location;
    printf("Enter incident location (number): ");
    scanf("%d", &incident_location);
    int nearest_guard = findNearestGuard(guards, 3, incident_location);
    printf("Incident reported at location %d\n", incident_location);
    printf("Nearest guard assigned: ID %d at location %d\n", guards[nearest_guard].id, guards[nearest_guard].location);

    return 0;

}