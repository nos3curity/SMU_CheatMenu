# Spider-Man Unlimited 1.9.0f Frida Cheat Script
<p align="center">
  <img src="https://pbs.twimg.com/media/C52bV28WQAAgvCE.jpg" />
</p>

## What is this script?
This is a Frida script for the 1.9.0f arm build of the Spider-Man Unlimited Gameloft game for Android. It takes advantage of the hidden cheat menu left by the game developers and has the ability to unlock all Spiderman, give in-game currency and perform other cheat functionality such as invincibility.

**Note:** This script will not work for any version and build other than 1.9.0f arm. The function offsets will be totally different, so don't even attempt it.

## How do you run this script?
1) Connect to your Android device using `adb connect` and run `frida-server` on your device. 
2) Get the Frida server and client [here](https://github.com/frida/frida/releases) if you don't have it already.
3) Start the Spider-Man Unlimited app and get to the game menu
4) Run the script with Frida using `frida -U Spider-Man -l .\cheatMenu.js`

**Note:** You need a rooted phone to run Frida

## How does this script work?
Read my [blog](https://nosecurity.blog/) for technical details.
