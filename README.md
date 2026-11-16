# SIGNAL

**Find the signal in the noise.**

SIGNAL is an original daily open-answer game for Reddit, built with Devvit Web. Every day, all players receive the same seven prompts. Each round gives the player 25 seconds to send one answer. Accepted answers are assigned a rarity tier: the less obvious the answer, the stronger the signal and the higher the score.

## Current playable build

- Seven prompts in a daily rotating set.
- 25-second answer window for each prompt.
- One accepted answer per prompt; invalid entries can be retried while the clock is running, up to 15 attempts per round.
- Six score tiers: 10, 15, 30, 60, 85, and 100 points.
- 700-point maximum daily score.
- One saved result per Reddit account per day.
- Redis-backed, subreddit-scoped leaderboard and shared daily content rotation.
- Up to seven randomly selected, never-before-used questions per day; when fewer than seven remain, archive-answer transmissions fill the open slots.
- Archive rounds reuse a question selected from the answer archive, but remain open-answer: any accepted catalog answer for that question counts. The rotation avoids recently selected archive seeds for seven days when enough fresh entries remain.
- New questions remain inactive until at least one accepted answer is added to their answer bank.
- Local browser preview with a sample leaderboard and localStorage-backed simulation of the same content rotation.
- Separate compact Reddit post launch screen and expanded game.
- Server-saved progress that resumes at the current round if a player leaves and returns.
- Clear open-answer archive rules and an answer-report review path for normal and archive rounds.

The current catalog contains 59 questions, 3,103 accepted answer records, and 3,084 distinct canonical answers across those question pools. Each question has at least one accessible 10-point answer, with progressively less familiar answers in the higher tiers. New questions become eligible only after at least one accepted answer is committed for that question. The Devvit server stores permanent question usage, recent answer usage, and the shared daily selection in Redis. That state is shared by players on the same subreddit installation and is not stored in the content files. The Pages/Codespaces preview simulates that history locally in the browser, so preview rotations are not shared with Reddit.

## Run the browser preview in GitHub Codespaces

1. Open this repository in a Codespace.
2. Run `npm install`.
3. Run `npm run web:dev`.
4. Open the forwarded port 5173.

The preview stores progress in the browser's local storage. It does not write Reddit scores.

## Build and playtest on Devvit

Requires Node.js 24 or newer and the repository's local Devvit CLI.

```bash
npm install
npm run preflight
npx devvit login
npm run playtest
```

Choose the public test subreddit when prompted. The subreddit moderator menu includes **Create a SIGNAL post**. The Devvit backend checks answers, saves one daily result per Reddit account, and maintains a leaderboard in Redis.

## GitHub Pages

A workflow is included to build and deploy the same browser preview to GitHub Pages. This repository is currently private. On GitHub Free, Pages requires a public repository. I have not changed the repository's visibility. On an eligible paid plan, enable Pages with GitHub Actions and set the repository variable `ENABLE_PRIVATE_PAGES=true` to allow the deploy job to run.

The Codespaces preview works without changing repository visibility or enabling Pages.

## Daily game rules

- The daily set contains seven shared prompts selected once for the entire subreddit installation.
- Questions are not repeated until the approved question pool is exhausted; if fewer than seven new questions remain, archive transmissions fill the remaining slots.
- Archive transmissions are open-answer rounds. The rotation uses a randomly selected answer record to choose the source question, but every accepted answer in that question's catalog is valid. The system avoids recently selected archive seed entries for seven days when enough fresh answers remain.
- Each prompt has a 25-second answer window.
- One accepted answer is scored per prompt.
- Answers are checked against the current field catalog.
- Recognized answers earn 10, 15, 30, 60, 85, or 100 points.
- An unanswered prompt earns zero.
- Maximum daily score: 700.
- The daily reset uses midnight in New York (America/New_York).

## Hackathon checklist

The game is designed as a short daily experience in a Reddit Interactive Post. Before hackathon submission, it still needs a public test subreddit with a working post, continued answer-bank coverage and accessibility review, a final submission description, an app link, and a short demo video.
