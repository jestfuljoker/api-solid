## Analysis Requirements 📚

---

### Functional Requirements

- [x] Must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain a logged user profile;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It must be possible to obtain the user's check-in history;
- [x] It must be possible to pick up the user near gyms (Until 10km);
- [x] It must be possible for the user to locate the gyms by name;
- [x] It must be possible to check-in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym.

---

### Non-Functional Requirements

- [x] The user's password must be encrypted;
- [x] Application data must be persisted in a PostgresSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token).

---

### Business Rules

- [x] The user cannot register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if he is not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after creation;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators.
