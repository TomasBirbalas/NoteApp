# NoteApp (Final Full-Stack with .NET project)

![image](https://user-images.githubusercontent.com/94862217/179897395-13192cfc-f15b-4905-9592-09dd8304ec57.png)

This project will require you to create a Notepad application using .NET and a SQL database. The purpose of the project is to allow registered users to create and store notes, assign them to certain categories. You can imagine something like https://keep.google.com/, just a simplified version.

## Functionality:
- Register new user;
- Login to the app;
- Categories:
-   Create new category (only logged in users);
-   Change category title (only logged in users);
-   Delete category (only logged in users);
- Notes:
-   Create new note (only logged in users);
-     Note must have title and content;
-     Should be able to add an image to the note;
-     Allows user to assign a note to a certain category;
-   Edit note (only logged in users);
-   Delete note (only logged in users);
- Filter notes by title (only logged in users);
- Filter notes by category (only logged in users);

## Technologies used:
- BackEnd: C# .NET core;
- DataBase: SQL;
- Comunication between database and backend: Entity Framework;
- FrontEnd: react.js website;

## Entities:
- User;
- UserDetails;
- Note;
- Category;
- Image;
