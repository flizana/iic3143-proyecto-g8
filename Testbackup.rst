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
        [Tags]  Courses
        Create Valid Teacher
        Wait Until Page Contains  ${TEACHER-FIRSTNAME} ${TEACHER-LASTNAME}

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
        Wait Until Page Contains Element  xpath=//*[@id="side-menu"]/li[4]/a
        Click Element  xpath=//*[@id="side-menu"]/li[4]/a
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/a
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/a

    Multiplechoice Question
        [Arguments]  ${optionA}  ${optionB}  ${optionC}  ${optionD}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[1]
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[1]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[1]/div/input  ${optionA}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[2]/div/input  ${optionB}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[3]/div/input  ${optionC}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[4]/div/input  ${optionD}

    Add Title To Multiplechoice Question
        [Arguments]  ${title}  ${number}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Add Option For Multiplechoice
        [Arguments]  ${optionE}  ${number}
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/button
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[5]/div/input  ${optionE}

    Edit Multiplechoice Question
        [Arguments]  ${optionA}  ${optionB}  ${optionC}  ${optionD}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[1]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[1]/div/input  ${optionA}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[2]/div/input  ${optionB}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[3]/div/input  ${optionC}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[4]/div/input  ${optionD}

    True Or False Question
        [Arguments]  ${title}  ${optionC}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[2]
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[2]
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/button
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/div[3]/div/input  ${optionC}

    Numeric Question
        [Arguments]  ${title}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[3]
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[3]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Short Answer Question
        [Arguments]  ${title}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[4]
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[4]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Long Answer Question
        [Arguments]  ${title}  ${number}
        Wait Until Page Contains Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[5]
        Click Element  xpath=//*[@id="page-wrapper"]/div[3]/div[1]/div/div[2]/ul/li[5]
        Input Text  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[${number}]/div[2]/input  ${title}

    Submit Then Close Answer
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[1]/div[2]/button
        Wait Until Page Contains  Error
        Click Element  xpath=//*[@id="page-wrapper"]/div[2]/div/div/div[2]/div[1]/div[1]/i

    Teacher Profile
        Create Valid Teacher
        Wait Until Page Contains Element  xpath=//a[@id="edit-profile-link"]
        Click Element  xpath=//a[@id="edit-profile-link"]

    Edit Info
        [Arguments]  ${firstname}  ${lastname}  ${school}  ${email}
        Wait Until Page Contains Element  name=firstName
        Input Text  name=firstName  ${firstname}
        Input Text  name=lastName  ${lastname}
        Input Text  name=school  ${school}
        Input Text  name=email  ${email}

    Student Profile
        Create Valid Student
        Wait Until Page Contains Element  xpath=//a[@id="edit-profile-link"]
        Click Element  xpath=//a[@id="edit-profile-link"]

    Create Course
        [Arguments]  ${coursename}
        Create Valid Teacher
        Wait Until Page Contains Element  xpath=//*[@id="side-menu"]/li[3]/a
        Click Element  xpath=//*[@id="side-menu"]/li[3]/a
        Wait Until Page Contains Element  xpath=//a[@id="add-course-link"]
        Click Element  xpath=//a[@id="add-course-link"]
        Wait Until Page Contains Element  name=courseName
        Input Text  name=courseName  ${coursename}
        Click Element  xpath=//input[@class="btn btn-MD btn-primary"]

    Add Course Activity
        [Arguments]  ${activityname}
        Wait Until Page Contains Element  xpath=//a[@class="btn btn-default pull-right"]
        Click Element  xpath=//a[@class="btn btn-default pull-right"]
        Wait Until Page Contains Element  id=titulo
        Input Text  id=titulo  ${activityname}

    Suscribe
        [Arguments]  ${coursename}
        Create Course  ${coursename}
        Logout
        Create Valid Student
        Wait Until Page Contains Element  xpath=//*[@id="side-menu"]/li[1]/div/input
        Input Text  xpath=//input[@class="form-control ng-pristine ng-untouched ng-valid"]  ${coursename}
        Click Element  xpath=//button[@ng-click="search()"]
        Wait Until Page Contains Element  xpath=//button[@class="boton-inscribir-curso ng-scope"]
        Click Element  xpath=//button[@class="boton-inscribir-curso ng-scope"]

    *** Variables ***
    ${TEACHER-FIRSTNAME}  Patricio
    ${TEACHER-LASTNAME}  Ortiz
    ${SCHOOL}  The Grange School
    ${NEW-SCHOOL}  The Grange
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
    ${COURSENAME}  Computing
    ${ACTIVITYNAME}  Programming
