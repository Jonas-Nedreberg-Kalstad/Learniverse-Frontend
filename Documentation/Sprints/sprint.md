## Sprint 1: Planning (Due date: February 18, 2025)
**When did you work with the project – which weeks?**  
We worked on the planning phase from week 3 to week 7, covering the period from January 20 to February 18, 2025.

**What was the goal in this sprint?**  
The primary goal of this sprint was to establish the foundation for our Frontend Application. Creating wireframe designs for all pages, creating a use case diagram to plan functionalities. We also aimed to set up the initial React project structure and create skeleton pages for the main components of our application: landing page, login page, signup page, course search page, and view course page.

**How was the work distributed among group members?**  
Jonas took responsibility for creating the signup and course search page skeletons, and the use case diagram. Tobias set up the React project and created the landing page, login page, and view course page skeletons. Both team members collaborated on wireframe designs and project planning.

**What was accomplished in this sprint?**  
We almost completed all planned tasks for the Planning sprint:

1. Discussed which frontend framework to use, which was React because of it's well established reputation and a large amount of documentation, as well as very relevant in the industry.

1. We set up the React project with the necessary configurations and dependencies, including React Router for navigation, Axios for API communication, and JWT for authentication.

2. We created a foundational wireframe designs for most pages of the application

3. We developed a use case diagram documenting all user interactions with the system

4. We started on a design document outlining the application design, however this will have to change later

5. We implemented skeleton pages for the core components of our application:
   - Landing page
   - Login page
   - Signup page
   - Course search page
   - View course page



## Sprint 2: Frontend Design & Basic Functionality (Due date: March 17, 2025)
**When did you work with the project – which weeks?**  
We worked on this sprint from week 8 to week 11, covering the period from February 19 to March 17, 2025.

**What was the goal in this sprint?**  
The primary goal of this sprint was to transform our skeleton pages into styled, interactive components and implement the core user functionality. We aimed to create a visually appealing user interface, implement login and signup forms, and establish API communication with the backend.

**How was the work distributed among group members?**  
Jonas handled user authentication, cookie storage for sessions, and search functionality including the search page with filters. He also set up page routing and universal fetch methods. Tobias developed the dynamic course display, created the enrollment system with payment functionality, and implemented API communication methods. He also styled the login page and added popular courses to the landing page. Both team members collaborated on maintaining consistent styling and testing the API integration.

**What was accomplished in this sprint?**  
We successfully delivered the following frontend components and features:

1. UI Design and Styling:
   - Styled the login page with proper form layout, input validation, and responsive design
   - Completed the signup page styling and a form with feedback mechanisms
   - Implemented consistent styling across all pages

2. User Authentication:
   - Implemented cookie storage for maintaining user sessions
   - Created visual indicators to display the logged-in state to users
   - Added form validation for login and signup inputs
   - Implemented the functionality to send signup data to the backend

3. API Communication Framework:
   - Developed universal GET and POST methods in the fetch.js utility
   - Created the foundation for secure API calls with authentication tokens
   - Set up the framework for calling the backend API to display results



## Sprint 3: Advanced Features & Backend Integration (Due date: April 20, 2025)
**When did you work with the project – which weeks?**  
We worked on this sprint from week 12 to week 16, covering the period from March 18 to April 20, 2025.

**What was the goal in this sprint?**  
The main goal of this sprint was to implement advanced features for different user roles (provider, admin), enhance the search experience, and create a robust notification system. We aimed to complete all remaining functionality required for the course management platform, with a focus on provider course creation and admin user management.

**How was the work distributed among group members?**  
Jonas focused on user management features and authentication. He restructured the file hierarchy, created the provider course management page, and developed a reusable modal component. He also built the user profile section with functionality for managing enrollments and account settings. Tobias handled course management interfaces, improved UI styling, and created service classes for API communication. He implemented the global notification system, built the admin dashboard, and added review functionality to the course page. Both members collaborated on integrating components, user testing, and debugging complex features like role-based access control.

**What was accomplished in this sprint?**  
We successfully implemented a wide range of advanced features and backend integrations:

1. Provider Features:
   - Created and styled a course creation page
   - Implemented functionality to post course data to the backend
   - Developed the ability to update existing courses

2. Admin Functionality:
   - Created an admin panel to view all users in the system
   - Added the ability to create new provider accounts and provider organizations
   - Developed a user/provider management interface for administrators

3. Enhanced Search Experience:
   - Added advanced filtering options for search results.

4. Advanced Components:
   - Developed a notification system for user feedback.
   - Created a reusable and modular modal component.



## Sprint 4: Deployment to Production (Due date: May 12, 2025)
**When did you work with the project – which weeks?**  
We worked on this sprint from week 17 to week 19, covering the period from April 21 to May 12, 2025.

**What was the goal in this sprint?**  
The primary goal of this sprint was to deploy our Course Management Frontend Application to a production environment using Azure with an automated CD pipeline and proper server configuration, as well as doing finishing touches on the frontend.

**How was the work distributed among group members?**  
Tobias and Jonas collaborated on setting up the Azure infrastructure and Nginx web server configuration. Through joint troubleshooting, they worked on VM provisioning and containerization. Jonas completed the final UI components in the footer section. Tobias worked on finalizing the design and improving the lighthouse score. Both members worked together on deployment testing and solving server configuration challenges.

**What was accomplished in this sprint?**  
We encountered significant challenges while deploying as we were trying to learn azure and how to set up the infrastructure and werent able to finish the CD pipeline, but completed the following:

1. Infrastructure:
   - Set up the cloud infrastructure
   - Developed IaC files for automatic provisioning

5. Nginx Configuration:
   - Set up Nginx as a web server to host and serve the React application
   - Configured HTTPS using an SSL certificate to secure traffic for our domain
   - Requests with prefix /api gets routed to the backend internally in the machine

3. Finishing Touches:
   - Fixed minor issues discovered on the frontend
   - Improving Lighthouse score

4. Design
   - Finalized the design document and applied it

**Problems encountered**  
We encountered many issues when dockerizing, configuring the nginx and setting up the cloud infrastructure, so everything took longer than we initially expected, and we were not able to complete the CD pipeline during this sprint.



## Sprint 5: Finalize Project (Due date: May 23, 2025)
**When did you work with the project – which weeks?**  
We are working on this sprint in weeks 20-21, covering the period from May 13 to May 23, 2025.

**What is the goal in this sprint?**  
The goal of this sprint is to finalize our project for submission by completing documentation, creating presentation materials, and preparing a comprehensive README.md file.

**How is the work being distributed among group members?**  
Jonas is handling project documentation, including the README with setup instructions and documentation. Tobias is finalizing the cloud infrastructure with auto-deployment capabilities. Both members are collaborating on bug fixing, and preparing presentation materials for the final submission.

**What has been accomplished in this sprint so far?**  

1. Deployment:
   - Pushed all finished IaC and initialization scripts
   - Outlined a CD pipeline for frontend

1. Documentation:
   - Created a README.md file with setup instructions
   - Uploaded all required documentation in readable format

2. Presentation Materials:
   - Began working on the video presentation
   - Prepared a powerpoint for recording

Though we weren't able to integrate Azure DevOps into our project in time, the CD pipeline is still outlined and should work. However, the attempt to get everything to work perfectly took a lot of time and ended up spending a lot of the time in this sprint working on the deployment still.