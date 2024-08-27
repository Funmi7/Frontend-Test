# Frontend Test Project: Task Management Board

## Project Overview

This project is a simplified task management board, inspired by tools like Trello and Asana. The application allows users to create, organize, and manage tasks within columns using drag-and-drop functionality.

## Features

- **Task Creation**: Users can add new tasks to any column.
- **Drag-and-Drop**: Tasks can be reordered within the same column and moved between columns using drag-and-drop.
- **Task Editing and Deletion**: Users can edit or delete tasks.
- **State Persistence**: The state of the board is saved in the browser's local storage, ensuring consistency across page reloads.
- **Responsive Design**: The application is designed to work well on different screen sizes.

## Implementation Details
Drag-and-Drop
The drag-and-drop feature should implemented using react-beautiful-dnd for smooth, native-like drag-and-drop interactions.
Visual feedback is provided during the drag-and-drop action to enhance the user experience.

## State Management
The application state is managed using Zustand to maintain a clear and scalable architecture.
The board's state should use Zustand Persist middleware in the local storage to retain changes across page reloads.

## Testing
Unit tests should be written using Jest.
Tests cover key components and functions to ensure they behave as expected.

### Enhanced UI/UX: Add animations or transitions to the drag-and-drop interactions.

## How to Submit
Please fork this repository, complete the project, and submit your work as a pull request. Alternatively, you can create a private repository and invite [pault@pakt.world] as a collaborator.

Contact
If you have any questions or need further clarification, feel free to reach out to [feedback@pakt.world].
