# EWA

### 1. Setup Angular CLI runner
![Alt text](images/Angular-CLI-config.png?raw=true "Title")
### 2. Setup Spring boot runner
![Alt text](images/SpringBoot-config.png?raw=true "Title")
### 3. How to push database changes (migrations)

1. Create the .SQL file which contains the changes
2. Name it according to the following example: v1.0__init.sql. 
Change the version number to the next version (in this example v2.0)
and change the name init to a desired name. Example: v2.0__accounts.sql
3. Now navigate to the following directory: api/src/main/resources/db/migration
4. Paste your file into this directory.
5. Migration added! Restart your Spring application to let this migration take affect
6. Ensure to commit the .SQL file(s) to the Git repository.

### 4. How to add a new component or another angular schematic
1. Navigate to the following directory: web/src/app
2. Right click on this folder in the project explorer
3. Select new -> Angular Schematic. A pop-up will appear with options.
4. Select the desired option, add additional parameters if neccesairy.
5. CLI will start, follow the steps on the CLI
6. Schematic generated

Note: This only works within the *app* folder. This due to the NgModule dependency.
