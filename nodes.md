# Auth Notes

## Objectives

- implement secure pw storage
- implement auth using sessions and cookies
- use sessions to protect resources
- use db to store sessions

###  implement secure pw storage

Never store pw in plain text , hash them .

pw --> hashing func --> hash

hash pw b4 storing in db

> When using sessions, the info is saved in server
> The cookie only needs session ID