## Analysis Requirements 📚

---

### Functional Requirements

- [ ] Must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain a logged user profile;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It must be possible to obtain the user's check-in history;
- [ ] It must be possible to pick up the user near gyms;
- [ ] It must be possible for the user to locate the gyms by name;
- [ ] It must be possible to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym.

---

### Non-Functional Requirements

- [ ] The user's password must be encrypted;
- [ ] Application data must be persisted in a PostgresSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token).

---

### Business Rules

- [ ] The user cannot register with a duplicate email;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if he is not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after creation;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators.