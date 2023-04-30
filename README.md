<div align="center">
  <h1>Waifu On The Web</h1>
  <img src="public/assets/thumbnail.png?raw=true" alt="thumbnail">

  [![Netlify Status](https://api.netlify.com/api/v1/badges/dee7e35d-e19a-459d-8f09-dab97e2cfb00/deploy-status)](https://waifu.sglkc.my.id)
  [![Issues](https://img.shields.io/github/issues/sglkc/waifu-otw.svg)](https://github.com/sglkc/waifu-otw/issues)
  [![MIT License](https://img.shields.io/github/license/sglkc/waifu-otw.svg)](LICENSE)

  A client-sided Artificial Intelligence with Natural Language Processor, Live2D, and Speech Recognition.

  <a href="https://github.com/sglkc/waifu-otw/issues">Report a Bug</a>
  <strong>·</strong>
  <a href="https://github.com/sglkc/waifu-otw/issues">Request a Feature</a>
</div>

## Hello, I'm Chiai!

Chiai (千愛) is your average teenage girl.

Her name comes from my name + AI. Interestingly, it also means "A thousand love" in Japanese, just like how I love developing her.
Her model is from [Live2D Sample Model Collection](https://www.live2d.com/en/download/sample-data/), anything else is from the internet,
and I do not claim any assets here, credits are to the rightful owner.

## About this project

I made this for Introduction to Computer Science, my task was just to make a video about the AI I wanted to make.
Here's the point: I can't make no videos, so I decided to make the AI into reality instead. And to be honest this is the most elaborate project I have ever worked on.

> Shoutout to [nlp.js](https://github.com/axa-group/nlp.js/) for Natural Language Processing, [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display)
> for the Live2D display, and [Vite](https://vitejs.dev/) for bundling (and TypeScript for the type errors!)

At first, I made this in plain HTML and JavaScript, but I realized that it's too hard to maintain and requires too much hacks that it'd be hard to understand by anyone.
If you want the old outdated version, you can go to [static](https://github.com/sglkc/waifu-otw/tree/static) branch, or visit the [demo](https://sglkc.github.io/waifu-otw).

## Features

The main focus of this project is the chatting, anything else is not as important. Here's a list of what you can and may do:

### Chat in multiple language

Currently, it supports English, Bahasa Indonesia, and Japanese. If you start to chat in another language, the AI should automatically guess the language.
This is possible by providing multiple data for the AI.

> **Note**
> Japanese is currently incomplete, it just exist.

### Live2D

This is the most visual sugar of all time, it deserves no purpose except to drain your data to download a megabyte of Live2D assets.
But in defense, Live2D is connected to NLP so that the model could react to certain message intents.

### Speech Recognition

This feature will only work in updated Google Chrome browsers. You may use the microphone button on top-left to use your voice.
The input then will be transcribed to the message box and will be automatically sent once you stopped.

> **Warning**
> This feature is very buggy and the most prone to errors, never expect it to work!

## TODO

I'll put this here because I know well I won't do them. Things that can be added/improved and the reason why I didn't do it:

| What                          | Why                                                                                                  |
|-------------------------------|------------------------------------------------------------------------------------------------------|
| More message intents          | Takes so much time to make the data all by myself                                                    |
| Expressions                   | Since how NLP and Live2D interacts, it's hard to integrate it. Maybe with nlp.js sentient analysis?  |
| Smarter AI                    | It's possible, but nlp.js documentation just made it so hard I can't find anything that I want       |
| Better web UI/UX              | low priority as long as it works                                                                     |
| Progressive web-app (offline) | lowest priority nobody would want to use this offline lmao                                           |

## Development

To get this running on your machine, you could try these steps below:

1. Clone the repository
  ```sh
  git clone https://github.com/sglkc/waifu-otw.git
  cd waifu-otw
  ```
2. Install dependencies with a package manager
  ```sh
  npm install
  ```
3. Train the natural language model with the `train` script
  ```sh
  npm run train
  ```
4. a. Run in localhost
  ```sh
  npm run dev
  ```
4. b. If you wish to build for production
  ```sh
  npm run build
  ```

## Contributing

I really wish for anyone to help with this project, just a simple help with the data is much appreciated!

> It's in [src/nlp/](src/nlp/) btw, the more the better!!!!

1. Fork the repository
2. Create your branch (`git checkout -b patch-1`)
3. Commit your changes (`git commit -m 'chore: add more english intents'`)
4. Push to the branch (`git push origin patch-1`)
5. Open a [pull request](https://github.com/sglkc/waifu-otw/pulls)

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
