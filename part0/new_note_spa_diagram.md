```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: event handler prevents default handling of form submission
    browser->>browser: event handler creates new note and adds it to the notes list    
    browser->>browser: event handler rerenders the note list    


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 
    deactivate server

