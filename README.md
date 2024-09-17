# Project Name

## Project Description

This project uses TypeScript and Express while adhering to SOLID principles to create a modular and maintainable architecture.

## SOLID Principles Applied

- **Single Responsibility Principle (SRP)**: Each class in the project has a single responsibility. `ChatService` handles business logic related to chats, `ChatController` manages HTTP requests, and `Route` configures application routes.

- **Open/Closed Principle (OCP)**: The design allows for extending functionalities without modifying existing code. New services and controllers can be added and managed through dependency injection.

- **Dependency Inversion Principle (DIP)**: High-level classes (`ChatController`) depend on abstractions (`ChatService`), not on concrete implementations. This is achieved through `tsyringe` for dependency injection, which enhances modularity and maintainability of the code.
