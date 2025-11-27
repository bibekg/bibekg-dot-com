---
title: How I Built Pinpoint
---

Earlier this year, I built [playpinpoint.app](http://playpinpoint.app), a mini-game where each day you guess the name of a mystery place in your city to discover and, in the process, learn more about the landmarks and businesses that make up your city. Each day’s gameplay starts with this view that shows the first hint–a riddle about the place–and a search box to start guessing.

![pinpoint-storyboard.png](how-i-built-pinpoint/pinpoint-storyboard.png)

As the storyboard shows:

- The game progresses as you guess what the place is using an auto-complete search input.
- If your guess is wrong, you get another hint–up to 5–and if it’s right, you win.
- Along with these progressively revealed hints, each wrong guess gets put on a map as an arrow pointing to the correct place and is color-coded based on how far it is from it.
- Once you correctly guess the place or use up all 5 guesses, the place is revealed along with its location and a description blurb from Wikipedia.

## How the idea was born

One gloomy April morning in Manhattan, my friend Mat and I were holed up in a Sweetgreen planning what to do with a rainy Sunday. Rather than fight the weather for our original plan of walking the length of the island, we decided to lean into the day’s vibe and hack on something indoors. As long-time quasi-coworkers[FN: we’ve never worked on the same team but almost always on similar projects] and connoisseurs of delightful software, we’d always wanted to build a mini-game together. After a few minutes of riffing, we landed on the idea of guessing places within a city.

The very first prototype was a low-tech experiment: I opened Google Maps on my phone and scrolled around San Francisco—our old stomping grounds—secretly picked Base Camp, a restaurant we both loved, and told him I’d feed him clues until he guessed it.

“Hint #1: the address is 2400 Folsom St.”

He made a guess. I gave another hint: the business’s opening hours. 

“What am I supposed to do with that??” he complained.

Several hints later, he finally got it. He was understandably unimpressed; the hints weren’t great... but the core of the idea felt like it was. With better hint mechanics and an actual UI, we felt like this could be something cool.

Motivated by that spark, I spent several hours a week building it out between April and June.

## The tech stack

I don’t recall exactly what it started out with but at this point, Pinpoint is built using Typescript, React, and [the Next.js framework](https://nextjs.org/) and is continuously deployed with Vercel. The UI is built using the fantastic [Chakra UI](https://chakra-ui.com/) design system and component library. Place data for the game is sourced from a mix of APIs including [Google Maps](https://mapsplatform.google.com/lp/maps-apis/), [Google Places](https://developers.google.com/maps/documentation/places/web-service/overview), [Mapbox](https://www.mapbox.com/), and [Wikipedia](https://en.wikipedia.org/api/rest_v1/). The app also makes use of OpenAI’s chat completion LLM APIs for several features like riddle generation, place selection, and search result validation.

Once fetched, place and game data is stored in a PostgreSQL database powered by [Supabase](https://supabase.com/) and images are stored in [Cloudflare R2](https://www.google.com/search?q=cloudflare+r2&oq=cloudflare+r2&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDEzMDVqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8). Supabase was particularly great because it also acts as a backend for the web app to directly talk to, handles auth–mostly via an [“anonymous sign-ins”](https://supabase.com/docs/guides/auth/auth-anonymous) paradigm but also with Google to save your play history & stats–and provides a super user-friendly dashboard for exploring and managing the database. I also built an analytics dashboard in [Retool](https://retool.com/), with little work beyond writing a handful of SQL queries against the Supabase DB.

![image.png](how-i-built-pinpoint/image.png)

This tech stack has since become my go-to for rapid prototyping since all of these frameworks and libraries are powerful, mature, and well-documented frameworks that I’m deeply familiar with now and play nicely with AI coding assistants like Cursor.

## Challenges

*Tip: to get the most out of this section, I’d recommend going to [playpinpoint.app](http://playpinpoint.app) and giving the game a run-through if you haven’t already.*

I ran into a handful of noteworthy challenges, some expected, others more surprising.

### Challenge #1: Hint mechanics and sequencing

From the get-go, I knew the hint mechanics and sequencing would be pivotal to making the game fun. The hints needed to be designed and revealed in just the right way to tune the difficulty between challenging and doable. I probably changed the play experience (PX) over a dozen times as I watched friends play it on different places, eventually developing a target difficulty around this principle:

> *Players that already know the place should still have a slightly hard time guessing it off just the first hint while players that don’t know it at all should still have a good chance of guessing it within the five chances they get.*
> 

I eventually landed on two parallel tracks of hints. 

- Hint track 1: 5 details about the place that progressively reveal more about the place.
- Hint track 2: a map where each wrong guess you make shows up as a color-coded arrow pointing you towards the right place.

These two parallel tracks of hints needed to be tuned in lockstep. The sequencing I eventually landed on for revealing place details was the following (using **San Francisco Armory** as our example place of the day).

1. **A riddle about the place**, e.g. “*brick fortress of bygone drills, echoes of silk and lights thrill.”* This is first because it’s the most attention-grabbing while also being the least revealing (unless you definitely know the place). If you’re wondering how these are written, there’s a whole section on this below!
2. **A blurred image of the place**. This one’s 2nd because it’s slightly more likely to give away either the place or the general vicinity if you’ve ever come across the place. It’s blurred because a lot of times, a canonical image of a place includes a big sign saying the name of the place. Can’t have that giving the place away too easily.
3. **The first letter of each word in the name + a vague location,** e.g *“S__ F________ A_____”* and *“Establishment @ Mission St • Mission District”*. With 5 hints total, I realized that hint #3 is where the helpfulness needs to spike pretty drastically. This gives a player that genuinely doesn’t know the place a fighting chance to use their three remaining guesses to pinpoint it using the secondary track of hints: the wrong-guess arrows.
4. **A full description of the place**, e.g. “*Completed in 1914, this large Moorish building & former National Guard facility now offers tours.”* This comes straight from the Google Places API and tells you a lot about the place without ever revealing the name. Like Hint #3, it’s pretty high-helpfulness which is ideal for a late hint. In the rare case where the Google Places API result doesn’t include the `editorialSummary` field this is populated from, an LLM is used to research the place and generate it instead.
5. **A few more letters in the name,** e.g. *“SAN F_____ A________”*. At this point, the user already has four wrong-guess arrows on the map pointing towards the right answer and 4 existing pieces of info about the place. This hint is geared toward enabling them to just type those first three letters–SAN–into the auto-complete search field and have a chance of finding the right answer.

In essence: As the hints and guesses progress, the game’s personality gently shifts from being mysterious and elusive at the start to overwhelmingly helpful by the end, with a sharp spike at the halfway point. If you plotted its helpfulness, it’d look like [an exponential function](https://en.wikipedia.org/wiki/Exponential_function) with an inflection point at guess #3.

### Challenge #2: Populating the catalog of places

A major inspiration for me in making this game was [Wordle](https://www.nytimes.com/games/wordle/index.html)–a game where you guess a new five-letter English word each day. But filling out a catalog of five-letter English words is a lot easier than finding interesting places within a city and aggregating the necessary bits of information about them. There are a few tricky constraints here:

1. **Local expertise.** Choosing places thoughtfully requires knowing the city at least a bit. As a comical example, in the early days when I was doing this with a more high-automation, low-review strategy, I accidentally made one of the places for NYC [a random apartment building](https://www.reddit.com/r/nyc/comments/1lxahww/comment/n2kka4q/)… that too, on *the* day I launched it in the r/nyc subreddit (which is probably why the post got removed by moderators ☹️) Unless I plan to hire local experts or find reliable data sources for each city the game supports, this makes scaling to different cities really difficult. Even for my home city of SF, I know it pretty well but wouldn’t feel confident manually curating the list.
2. **Uniqueness and size.** There are over 10K English words that are five letters long. That gives Wordle a theoretical limit of *21 years* of words to pick from (though in practice [it only uses around 2.3K words](https://towardsdatascience.com/loaded-words-in-wordle-e78cb36f1e3c/), or 6 years). In contrast, there are probably only a few hundred widely noteworthy places in each city, which hardly even clears one year. Pinpoint will inevitably have to repeat places at a frequency noticeable to dedicated players.
3. **Data fetching.** At minimum, I’ll need to fetch some additional data about each place like its location, address, description, and an image. In practice, this means it must be in the Google Maps API. Additionally, I also added a feature to display a Wikipedia blurb and link for each place in the game over screen (to make it easy to go learn more about it) so that’s yet another data source to connect to.

After gradually automating more and more of the pipeline (shout out to Cursor for making light work of writing useful CLIs), the workflow for adding new places is now as simple as running a one-liner like `npm run cli -- populate -c sf -n 100`. Here’s what this does under the hood to find 100 fresh “places to guess” for San Francisco by orchestrating a few APIs:

1. OpenAI LLM with web search suggests popular SF places, prompted to exclude places we’ve used in the past 180 days (I’ve tried larger values here but it sadly ends up producing duplicates or bad results too often). The “exclude places we’ve used” instruction is imperfect since LLMs are imperfect so later steps in this flow also do duplicate checks.
2. Google Places Autocomplete resolves each suggestion to an exact place inside SF’s bounds, then Places Details pulls core facts (name, address, types, coordinates, website, editorial summary, photos).
3. The first photo is fetched via the Google Places Photo API and saved to Cloudflare R2; a blurred/obfuscated version is generated using [Jimp](https://jimp-dev.github.io/jimp/) and uploaded as well.
4. Wikipedia’s APIs are queried for a matching article and summary; if there are multiple candidates, an LLM picks the best one, with a bias to pages near the place’s coordinates.
5. If Google doesn’t have an editorial summary, OpenAI writes a short, neutral description (no city or place name). Separately, OpenAI crafts a one‑line riddle (with web search) plus a brief explanation of the riddle.
6. All metadata—links, coordinates, categories, a vague location hint, images—is bundled and scheduled for the next open date in Supabase, skipping duplicates.

This `populate` CLI command is the culmination of carefully automating each of these other pieces over several iterations of loading new places. For now, I’ll keep running this command manually and see if I can trust running it unsupervised. In the future once I’m confident it’s working smoothly, I’m hoping to automate this to happen in the background once daily or weekly using [Vercel cron jobs](https://vercel.com/docs/cron-jobs).

### Challenge #3: Guiding users into and through the game

This was one of the most challenging yet fun parts of building the game. Good UX design is mostly storytelling. It’s a question of how well can you–the person with the greatest [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge) about the thing–explain it to someone with zero knowledge about the thing?

The best answer to this is to put the thing in users’ hands, watch them use it (without teaching them how to), and noticing the little details that they trip over. Each trip-up is a treasure trove of signal about how their mental model differs from your own and what aspects of the UI need clearer disambiguation. It also helps to have great beta testers that can articulate what they found confusing and make concrete suggestions on how to improve it.

After many weeks–or perhaps even a few months–of doing that, I uncovered dozens of subtle design choices whose stories are best told in storyboard form.

![pinpoint-storyboard-detailed.png](how-i-built-pinpoint/pinpoint-storyboard-detailed.png)

### Challenge #4: Validating the user’s guess for correctness

What makes a guess correct? It seems like a simple question. “If it’s the same place, duh!”

At first, I thought so too so my `isGuessCorrect` function simply took the naive approach.

```tsx
function isGuessCorrect(guessedPlace, correctPlace) {
  return guessedPlace.placeId === correctPlace.placeId
}
```

A few weeks after rolling out my MVP, however, I got messaged by numerous friends saying that the day’s SF Pinpoint rejected a bunch of valid answers! I took a look at the place for the day. It was Graffiti Alley in the Mission. I searched it up in Google Maps and immediately saw the problem.

![CleanShot 2025-11-24 at 21.24.26@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_21.24.262x.png)

This one conceptual location had at least four valid “places” in the Google places database: Graffiti Alley, Clarion Alley, Clarion Alley Street Art, and Clarion Alley Murals. It turns out that the Google Places database–or more generally speaking, the world–is filled with cases like this. 

So what’s a game developer to do? `placeId` comparisons would clearly be too strict. As would `name`. Using some sort of name *substring* check could work in *some* cases here but clearly not here: `Graffiti Alley` and `Clarion Alley` have `Alley` as overlap but that’s too generic to permit. I could ask an LLM to compare them? But then I’d have an expensive LLM call in the core gameplay flow! No thank you.

After weighing the tradeoffs for a while, I ultimately decided to take the imperfect but least-bad approach of `veryCloseTogether || addressesMatch`. If the coordinates are within 25 meters of one another or the *addresses* are identical, it’s a match. It’d lead to a few false positives but they’re rare enough to not really matter.

### Challenge #5: Building a riddlemaster

Riddles are exactly the kind of thing that would be unscalable for me to write manually but an LLM could churn out trivially. In my Cursor-fueled rush to get a prototype working, the MVP used a pretty crappy prompt that Cursor itself wrote for generating riddles. It ultimately got some hate when I did my initial feedback-seeking launch on Reddit.

![CleanShot 2025-11-24 at 17.07.00@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_17.07.002x.png)

After a couple of rounds of prompt engineering, I was pretty happy with the results it was outputting. If you want to see the exact prompt and OpenAI API call that generates them, check out this [GitHub gist](https://gist.github.com/bibekg/50c50efe5d049e37bf76ae8b0b1534d7)!

![CleanShot 2025-11-24 at 17.14.03@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_17.14.032x.png)

For debugging purposes, I also had the LLM output an explanation of the riddle so I could sanity check it but later realized this would be a fun bit of info to show players in a tooltip after the game ended since it often includes trivia about the place!

![Screenshot 2025-11-24 at 5.16.42 PM.png](how-i-built-pinpoint/Screenshot_2025-11-24_at_5.16.42_PM.png)

### Challenge #6: Avoiding bankruptcy in case I suffer from success

With the naive implementation of the autocomplete and place fetching logic I had at first, I was signing up for a non-trivial monthly bill from Google Cloud. Every character typed into the search field would make an auto-complete API call and every place guessed would be a place details fetch. This cost me $42 in June! 

 To make things as cost-efficient as possible, I added a few critical performance optimizations:

1. **No runtime LLM calls.** The cost of LLM calls adds up quickly so I only make them in scripts used when adding new places to the catalog. These are used to generate riddles, confirm which result in the Google Places search results is the right one, and similarly to verify which Wikipedia article is the right one for the place. All of these add up to less than one cent of LLM spend per place I add.
2. **Cached Google Maps and Places results**. Since each day will result in players guessing mostly the same places, the auto-complete search results and place details are excellent candidates for caching. So every request for those two things first checks the Supabase cache (`google_maps_autocomplete_results` and `google_maps_place_details` tables) before asking for it from the APIs to avoid unnecessary duplicate Google API calls. The autocomplete results use a cache key of `[city_id, search_text]` since every search is bounded by the city’s coordinate boundaries. With this in place, my Google Places usage fell under the free tier limit so it’s free!

## Rollout and reception

For a month or two, I kept rollout limited to friends; first close friends, then all my Instagram followers. Later on, after making an analytics dashboard in Retool to monitor usage, I made a few posts in city-specific Reddit subreddits ([example](https://www.reddit.com/r/sanfrancisco/comments/1l2krox/comment/nbxpk0h/?context=3)). Those Reddit launches led to good feedback and decent spikes in usage that’d expectedly peter back down to a stable state of only a dozen or two regular users.

![CleanShot 2025-11-24 at 17.24.09@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_17.24.092x.png)

![CleanShot 2025-11-24 at 17.23.00@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_17.23.002x.png)

![CleanShot 2025-11-24 at 17.23.16@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_17.23.162x.png)

![CleanShot 2025-11-24 at 21.11.49@2x.png](how-i-built-pinpoint/CleanShot_2025-11-24_at_21.11.492x.png)

## Cooking with Cursor

This was my first time making heavy use of Cursor from the get-go for building a non-trivially large web app. It was a fun and at times, frustrating, experience. Cursor–and AI-assisted coding agents in general–are great at some things and awful at others. Understanding the nuance of which tasks fall into each of those buckets–and how to prompt it well for any given task–requires a good bit of trial and error. 

Generally speaking, I found Cursor fantastic for:

- **Quickly prototyping an idea (at the start and while bootstrapping new features)**, ideally by prompting it to use languages and a tech stack you’re familiar with so your app doesn’t outpace your ability to understand and orchestrate development of.
- **Refactoring parts of the app that are straightforward but toilsome to do manually.** I think this is one of the keys to productive AI-assisted development. When you refactor things at the right times with the right abstractions, your abstractions become a higher-order language for prompting the AI to do even more things, even as your app scales.

And I usually jumped in to do things myself when:

- **Directing codebase architecture.** AI coding assistants seem to prefer long files and don’t have a good intuition for when to DRY things out. That makes sense–these decisions are influenced heavily by long-term codebase architecture vision which stems largely from the developer’s product vision. Stepping in to inject that vision at just the right times was the key to keeping Cursor productive.
- **Tweaking UIs to look just right.** Raw text is a terrible communication vehicle for describing a vision for a UI. Diagramming and wire-framing tools like Figma and Whimsical are a bit better but with thoughtfully-built design systems like Chakra UI (and experience using them/speaking in the language of them), coding directly often ends up being a lot faster.

And the best method for shifting more tasks from the DIY bucket into the vibe-coding bucket was to continually be meta-thinking about the abstractions I created as a higher-order language by which to communicate with Cursor for future tasks.

## What’s next?

As any side project must, I have a backlog of feature ideas longer than the amount of time I have free to build them. At a certain point, even Cursor can’t solve that since I still need to make time to define and opine on product design and vision.

- **🌏 Support more cities or even a “Worldwide” mode.** Right now the game is available in just four cities: SF, NYC, LA, Philly. I chose to support more than one but still a small number to stress test how painful scaling is… and unfortunately, it’s still painful. Worldwide could also be a fun addition though with places with global recognizability so anyone can play regardless of where they live.
- **☝️ Enable guessing by tapping the map instead of using a search field.** Many users have asked for this but it’s tricky because it’s incompatible with how things work right now. Choosing a place in the search field produces a specific Google Places place ID which is what’s necessary to do a “is this guess right?” check. Tapping on the map would only produce coordinates which would need to get translated to a place somehow, either by just auto-picking the place closest to it (bad since it’d likely choose a “false positive”, see challenge #4) or triggering a UI to pick a specific place in that area from a list of options.
- **🗺️ Change the map to use Google Maps.** The places in the autocomplete come from the Google Maps API while the map displayed in the UI uses Mapbox, two distinct services. This inconsistency usually doesn’t matter but in some rare cases, certain places show up in one but not the other, making for confusing experiences. Switching the map UI over is just non-trivial enough that I can’t just point Cursor or Claude at it so I’ll have to budget a few hours to make sure it goes smoothly.
- **🏆 Leaderboards and stats.** I’ve actually mostly implemented this already but left it in beta rollout to just a few friends because it needs a lot of polish.

## Closing thoughts

Building a mini-game like this has been a dream of mine for a while. It was really fun to work on, iterate through the myriad design considerations, and launch to supportive friends and strangers alike.

Much of the game would have been inapproachably cumbersome to implement without the reasoning capability of LLMs–like populating places, generating riddles, validating Wikipedia articles, etc.–so it was really cool to get to build something that I simply wouldn’t have just a few years ago.

Finally, although nothing about it *needed* me to use an AI coding agent (it was all fairly straightforward code-wise), using Cursor made the whole process so much faster, less toilsome, and even fun! It allowed me to spend most of my time thinking in terms of *ideas* rather than code–while occasionally requiring me to jump into code mode to direct codebase architecture decisions. This let me turn a gloomy Sunday afternoon vision into a solid prototype in less than 2 days and to materialize whole features in minutes rather than afternoons. The way it lowers the barrier to creativity and action is nothing short of magical.