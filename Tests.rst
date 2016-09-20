.. code:: robotframework

    *** Settings ***
    Library  Selenium2Library
    Library  OperatingSystem

    Test Setup  Setup For Tests
    Test Teardown  Close Browser

    *** Variables ***



    *** Test Cases ***

    #Creating Users

    Teacher can create an account and will be automatically logged in
        Create Valid Teacher
        Wait Until Page Contains  ${TEACHER-FIRSTNAME} ${TEACHER-LASTNAME}

    Student can create an account and will be automatically logged in
        Create Valid Student
        Wait Until Page Contains  ${STUDENT-FIRSTNAME} ${STUDENT-LASTNAME}

    Can't create user with used email
        Create Valid Teacher
        Logout
        Create Valid Teacher
        Wait Until Page Contains  Email ya está en uso. Por favor intente con otro email.

    Can't create user if password doesn't match confirmation
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${TEACHER-FIRSTNAME}  ${TEACHER-LASTNAME}  ${SCHOOL}  ${TEACHER-EMAIL}  ${PASSWORD}  differentPassword
        Wait Until Page Contains  Contraseñas no coinciden. Por favor intente nuevamente.

    Can't create user if all fields are not filled in
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${BLANK}  ${TEACHER-LASTNAME}  ${SCHOOL}  ${TEACHER-EMAIL}  ${PASSWORD}  ${PASSWORD}
        Wait Until Page Contains  Por favor rellene todos los campos.
        Close Browser
        Start FeedMe
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${TEACHER-FIRSTNAME}  ${BLANK}  ${SCHOOL}  ${TEACHER-EMAIL}  ${PASSWORD}  ${PASSWORD}
        Wait Until Page Contains  Por favor rellene todos los campos.
        Close Browser
        Start FeedMe
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${TEACHER-FIRSTNAME}  ${TEACHER-LASTNAME}  ${BLANK}  ${TEACHER-EMAIL}  ${PASSWORD}  ${PASSWORD}
        Wait Until Page Contains  Por favor rellene todos los campos.

    #Logging in

    Teacher can login with correct credentials
        Create Valid Teacher
        Logout
        Teacher Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  ${TEACHER-FIRSTNAME} ${TEACHER-LASTNAME}
        Close Browser

    Student can login with correct credentials
        Create Valid Student
        Logout
        Student Login  ${STUDENT-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  ${STUDENT-FIRSTNAME} ${STUDENT-LASTNAME}
        Close Browser

    User can't login if it doesn't exist
        Teacher Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    User can't login with wrong credentials
        Create Valid Teacher
        Logout
        Teacher Login  ${TEACHER-EMAIL}  wrongPassword
        Wait Until Page Contains  Credenciales inválidas

    Teacher can't login as student
        Create Valid Teacher
        Logout
        Student Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    Student can't login as teacher
        Create Valid Student
        Logout
        Teacher Login  ${STUDENT-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    *** Keywords ***
    Clear Database
        Run  ${DELETE DATABASE COMMAND}

    Start FeedMe
        Open Browser  http://localhost:3000/  gc
        Wait Until Page Contains Element  xpath=//a[@href='/teacher']

    Setup For Tests
        Clear Database
        Start FeedMe


    Create Teacher
        [Arguments]  ${firstname}  ${lastname}  ${school}  ${email}  ${password}  ${passwordConfirmation}
        Wait Until Page Contains Element  name=firstName
        Input Text  name=firstName  ${firstname}
        Input Text  name=lastName  ${lastname}
        Input Text  name=school  ${school}
        Input Text  xpath=//form[@action='/teacher/register']/fieldset/div/input[@name='email']  ${email}
        Input Text  xpath=//form[@action='/teacher/register']/fieldset/div/input[@name='password']  ${password}
        Input Text  name=confirmPassword  ${passwordConfirmation}
        Click Element  xpath=//input[@value='Registrarse']

    Create Valid Teacher
        Wait Until Page Contains Element  xpath=//a[@href='/teacher']
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${TEACHER-FIRSTNAME}  ${TEACHER-LASTNAME}  ${SCHOOL}  ${TEACHER-EMAIL}  ${PASSWORD}  ${PASSWORD}

    Create Student
        [Arguments]  ${firstname}  ${lastname}  ${school}  ${email}  ${password}  ${passwordConfirmation}
        Wait Until Page Contains Element  name=firstName
        Input Text  name=firstName  ${firstname}
        Input Text  name=lastName  ${lastname}
        Input Text  name=school  ${school}
        Input Text  xpath=//form[@action='/student/register']/fieldset/div/input[@name='email']  ${email}
        Input Text  xpath=//form[@action='/student/register']/fieldset/div/input[@name='password']  ${password}
        Input Text  name=confirmPassword  ${passwordConfirmation}
        Click Element  xpath=//input[@value='Registrarse']

    Create Valid Student
        Wait Until Page Contains Element  xpath=//a[@href='/student']
        Click Element  xpath=//a[@href='/student']
        Create Student  ${STUDENT-FIRSTNAME}  ${STUDENT-LASTNAME}  ${SCHOOL}  ${STUDENT-EMAIL}  ${PASSWORD}  ${PASSWORD}

    Teacher Login
        [Arguments]  ${email}  ${password}
        Wait Until Page Contains Element  xpath=//a[@href='/teacher']
        Click Element  xpath=//a[@href='/teacher']
        Wait Until Page Contains Element  xpath=//form[@action='/teacher/login']/fieldset/div/input[@name='email']
        Input Text  xpath=//form[@action='/teacher/login']/fieldset/div/input[@name='email']  ${email}
        Input Text  xpath=//form[@action='/teacher/login']/fieldset/div/input[@name='password']  ${password}
        Click Element  xpath=//input[@value='Iniciar Sesión']

    Student Login
        [Arguments]  ${email}  ${password}
        Wait Until Page Contains Element  xpath=//a[@href='/student']
        Click Element  xpath=//a[@href='/student']
        Wait Until Page Contains Element  xpath=//form[@action='/student/login']/fieldset/div/input[@name='email']
        Input Text  xpath=//form[@action='/student/login']/fieldset/div/input[@name='email']  ${email}
        Input Text  xpath=//form[@action='/student/login']/fieldset/div/input[@name='password']  ${password}
        Click Element  xpath=//input[@value='Iniciar Sesión']

    Logout
        Wait Until Page Contains Element  xpath=//a[@class='dropdown-toggle']
        Click Element  xpath=//a[@class='dropdown-toggle']
        Click Element  xpath=//a[@href='/logout']

    *** Variables ***
    ${TEACHER-FIRSTNAME}  Patricio
    ${TEACHER-LASTNAME}  Ortiz
    ${SCHOOL}  The Grange School
    ${TEACHER-EMAIL}  apo@apo.apo
    ${PASSWORD}  p4SSw0rd.
    ${STUDENT-FIRSTNAME}  Francisco
    ${STUDENT-LASTNAME}  Saldias
    ${STUDENT-EMAIL}  baboon@babs.bab
    ${DELETE DATABASE COMMAND}  mongo test --eval "db.dropDatabase();"
    ${BLANK}
