# WEB102 Prework - *Sea Monster Crowfunding Page*

Submitted by: **Joseph Lam**

**Sea Monster Crowfunding Page** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] Games search bar
* [x] Games nav shortcut button
* [x] Replaced default animation with box shadows
* [x] Floating scroll-to-top button
* [x] Logo favicon
* [x] Animation for currently active game filter button
* [x] Goal progress meter for games

## Video Walkthrough

Here's a walkthrough of implemented features:

<div>
    <a href="https://www.loom.com/share/b83890c2a34c4871b410e6580626356c">
      <p>CodePath Web102 prework demo - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/b83890c2a34c4871b410e6580626356c">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/b83890c2a34c4871b410e6580626356c-f122af5e4e38dc4f-full-play.gif#t=0.1">
    </a>
  </div>

Demo created with [Loom]([https://www.loom.com/](https://www.loom.com/)
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Using the sort() mutates the original array of GAMES_JSON. I fix this by making a copy of the array for each search. A better method might be to use the toSorted() method instead.

## License

    Copyright [2022] [CodePath]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
