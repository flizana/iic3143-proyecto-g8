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
        [Tags]  Creating Users
        Create Valid Teacher
        Wait Until Page Contains  ${TEACHER-FIRSTNAME} ${TEACHER-LASTNAME}

    Student can create an account and will be automatically logged in
        [Tags]  Creating Users
        Create Valid Student
        Wait Until Page Contains  ${STUDENT-FIRSTNAME} ${STUDENT-LASTNAME}

    Can't create user with used email
        [Tags]  Creating Users
        Create Valid Teacher
        Logout
        Create Valid Teacher
        Wait Until Page Contains  Email ya está en uso. Por favor intente con otro email.

    Can't create user if password doesn't match confirmation
        [Tags]  Creating Users
        Click Element  xpath=//a[@href='/teacher']
        Create Teacher  ${TEACHER-FIRSTNAME}  ${TEACHER-LASTNAME}  ${SCHOOL}  ${TEACHER-EMAIL}  ${PASSWORD}  differentPassword
        Wait Until Page Contains  Contraseñas no coinciden. Por favor intente nuevamente.

    Can't create user if all fields are not filled in
        [Tags]  Creating Users
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
        [Tags]  Logging In
        Create Valid Teacher
        Logout
        Teacher Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  ${TEACHER-FIRSTNAME} ${TEACHER-LASTNAME}
        Close Browser

    Student can login with correct credentials
        [Tags]  Logging In
        Create Valid Student
        Logout
        Student Login  ${STUDENT-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  ${STUDENT-FIRSTNAME} ${STUDENT-LASTNAME}
        Close Browser

    User can't login if it doesn't exist
        [Tags]  Logging In
        Teacher Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    User can't login with wrong credentials
        [Tags]  Logging In
        Create Valid Teacher
        Logout
        Teacher Login  ${TEACHER-EMAIL}  wrongPassword
        Wait Until Page Contains  Credenciales inválidas

    Teacher can't login as student
        [Tags]  Logging In
        Create Valid Teacher
        Logout
        Student Login  ${TEACHER-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    Student can't login as teacher
        [Tags]  Logging In
        Create Valid Student
        Logout
        Teacher Login  ${STUDENT-EMAIL}  ${PASSWORD}
        Wait Until Page Contains  Credenciales inválidas

    Create new form with all type of questions
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  1
        True Or False Question  ${TITLE}  ${OPTIONC}  2
        Numeric Question  ${TITLE}  3
        Short Answer Question  ${TITLE}  4
        Long Answer Question  ${TITLE}  5
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Se ha guardado la planilla

    Allow form to have more than one of each type of question
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        :FOR  ${INDEX}  IN RANGE  1  3
            \  Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  5*(${INDEX}-1) + 1
            \  True Or False Question  ${TITLE}  ${OPTIONC}  5*(${INDEX}-1) + 2
            \  Numeric Question  ${TITLE}  5*(${INDEX}-1) + 3
            \  Short Answer Question  ${TITLE}  5*(${INDEX}-1) + 4
            \  Long Answer Question  ${TITLE}  5*(${INDEX}-1) + 5
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Se ha guardado la planilla

    Multiplechoice question can't be created if not all fields are filled
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Multiplechoice Question  ${BLANK}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  1
        Submit Then Close Answer
        Multiplechoice Question  ${TITLE}  ${BLANK}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  1
        Submit Then Close Answer
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${BLANK}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  1
        Submit Then Close Answer
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${BLANK}  ${OPTIOND}  ${OPTIONE}  1
        Submit Then Close Answer
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${BLANK}  ${OPTIONE}  1
        Submit Then Close Answer
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${BLANK}  1
        Submit Then Close Answer

    True or false question can't be created with empty fields
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        True Or False Question  ${BLANK}  ${OPTIONC}  1
        Submit Then Close Answer
        True Or False Question  ${BLANK}  ${OPTIONC}  1
        Submit Then Close Answer

    Numeric questions can't be created with empty fields
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Numeric Question  ${BLANK}  1
        Submit Then Close Answer

    Short answer questions can't be created with empty fields
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Short Answer Question  ${BLANK}  1
        Submit Then Close Answer

    Long answer questions can't be created with empty fields
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Long Answer Question  ${BLANK}  1
        Submit Then Close Answer

    Can't create new form with empty title
        [Tags]  Forms
        Forms
        Short Answer Question  ${TITLE}  1
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Error

    Edit form correctly
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Numeric Question  ${TITLE}  1
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Se ha guardado la planilla
        Click Element  xpath=//*[@id="side-menu"]/li[4]/a
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div/a
        Click Element  //*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[1]/div[1]/i
        Multiplechoice Question  ${TITLE}  ${OPTIONA}  ${OPTIONB}  ${OPTIONC}  ${OPTIOND}  ${OPTIONE}  1
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Se ha guardado la planilla

    Delete form correctly
        [Tags]  Forms
        Forms
        Input Text  xpath=//*[@id="titulo"]  Nueva planilla
        Numeric Question  ${TITLE}  1
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Se ha guardado la planilla
        Click Element  xpath=//*[@id="side-menu"]/li[4]/a
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div/a
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[3]/button
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/a
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

    Forms
        Create Valid Teacher
        Click Element  xpath=//*[@id="side-menu"]/li[4]/a
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/a

    Multiplechoice Question
        [Arguments]  ${title}  ${optionA}  ${optionB}  ${optionC}  ${optionD}  ${optionE}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[1]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[1]/div/input  ${optionA}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[2]/div/input  ${optionB}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[3]/div/input  ${optionC}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[4]/div/input  ${optionD}
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/button
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[5]/div/input  ${optionE}

    True Or False Question
        [Arguments]  ${title}  ${optionC}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[2]
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/button
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[3]/div/input  ${optionC}

    Numeric Question
        [Arguments]  ${title}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[3]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Short Answer Question
        [Arguments]  ${title}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[4]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Long Answer Question
        [Arguments]  ${title}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[5]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Submit Then Close Answer
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Error
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[1]/div[1]/i

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
    ${TITLE}  Pregunta
    ${OPTIONA}  Primero
    ${OPTIONB}  Segundo
    ${OPTIONC}  Tercero
    ${OPTIOND}  Cuarto
    ${OPTIONE}  Quinto
    ${BLANK}
