*** Settings ***
Documentation   D01 - Secure admin login.
Resource        [link to resource file]
Test Setup      Open Admin Browser
Test Teardown   Close All Browsers  
Force Tags      [to be put for tags]

*** Test Cases ***
TC-D01-01 Valid Support Admin Can log In

TC-D01-02 Valid Disbursement Admin Can Log In

TC-D01-03 Wrong Password Is Rejected

TC-D01-04 Empty Credentials Are Rejected

TC-D01-05 Protected Page Redirects When Logged Out

TC-D01-06 Logout Ends The Session
