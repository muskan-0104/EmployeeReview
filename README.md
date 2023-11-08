This is Node.js applicatiion built for Career Development folks that help student with setting up their intervews. User can add a student to their portal, create an interview for them,
update student profile and interview status and result. User can also download a csv report with student and their respective interview details. Student details can only be viewed by 
logged in members.

**Project Setup:**
1. Create a new directory for your project
2. Run npm init to initialize project with nodejs
3. Clone the project, it has all necesaaary files and folders
4. Install all the required libraries using npm install
5. You can find lit of needed librarues in package.json
6. Run npm start
7. You project is ready for use

**Project Structure:**
1. Assests -> hold static files likes images, css, js
2. Config -> holds configuration of passport, middlewear, mongoose
3. Controller -> holds all the logic to update, create and delet different resources
4. Model -> has two models, users and feedback
5. Routes -> has endpoint to manipulate and view resources
6. Views -> hold the frontend templates