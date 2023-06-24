GTD XXV BE (leaderboard, telegram bot)
npm run dev

Features:
a. API (CRUD)

- Get entries
- Get leaderboard
- Post entry
- Patch entry
- Delete entry

b. Telegram Bot

- /start
- /help
- /leaderboard
- /view
- /viewmore
- /create
- /delete
- /deleteall

TODO

- stress test (charCount and traffic)
- docs (swagger, readme)
- dockerize for deployment

DONE

- db connection
- tele username whitelist
- valid og and day validation
- CRUD api endpoints
- tele bot commands
- custom /help based on role

FUTURE DEV:

- better auth for protected endpoints
- better request body validation (express-validator or joi)
- better routes (use express.Route)
- tele bot max message chars handling
- better create/update tele bot prompts (inline keyboard / stateful app)
- /update tele command
- make whitelist and /help more dynamic using mappings
