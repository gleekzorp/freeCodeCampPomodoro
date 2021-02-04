# freeCodeCampPomodoro

https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-25--5-clock

> I was able to get through this one without that much of a struggle. I first attempted to do this with moment for the time and came up with a good idea via my js playground. Once I started trying to add it to React I was struggling with the `setInterval`. I did some research and came across the following link. Once I saw how he was setting the variable to null before entering the conditionals it all made sense. I also kept running into an issue passing the test for the audio playing at the wrong time. I was originally playing it when the timer got to 0 in the interval. I moved it out into its own `useEffect` and now it works flawless!

> Helpful Resource for the interval: https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

## TODO:

- Styles
  - The FCC styles are sort of basic on this one. I might modify it a little.
  - Countdown < 0 change to red
  - Colors and fonts
  - Buttons need to be icons
- Code Organization
  - Possibly break things down into smaller components

## Pseudo Playground

```javascript
const moment = require("moment");

//////////////////////////////
// Math to convert to seconds
/////////////////////////////
// console.log(25 * 60)
// console.log(1499 / 60)
// console.log(1499 % 60)

///////////////////////////
// Working Moment Interval
//////////////////////////
// let currentTime = moment()
// let myVar = setInterval(subtractTime, 1000);

// function subtractTime() {
//   currentTime.subtract(1, 'second')
//   console.log(currentTime.format('mm:ss'))
// }

// setTimeout(function(){
//   clearInterval(myVar)
// }, 10000)

//////////////
// Randomness
/////////////
// let currentTime = moment.duration(25, 'minutes')
// let myVar = setInterval(subtractTime, 1000);

// function subtractTime() {
//   currentTime.subtract(1, 'second')
//   console.log(`${currentTime.minutes()}:${currentTime.seconds()}`)
// }

// setTimeout(function(){
//   clearInterval(myVar)
// }, 10000)

// console.log(moment.duration(26 * 60000).subtract(1, 'seconds'));
// console.log(moment.duration(26 * 60000 - 1).subtract(1, 'seconds'));
// let momentTime = moment.duration(timeLeft).subtract(1, 'seconds');

// const timeLeft = 26 * 60000
// let momentTime = moment.duration(timeLeft);
// momentTime.subtract(1, 'seconds');
// console.log(momentTime.minutes())
// momentTime.subtract(1, 'seconds');
// console.log(momentTime.seconds())

// console.log(time.format())

// console.log(25 * 60000)

// console.log(moment.duration(26 * 60000))
// moment.duration().subtract(1000)

// console.log(moment.duration().subtract(1000))

// let time = moment.duration(26 * 60000).asMinutes()

// console.log(moment.duration(26 * 60000).asMinutes())

// console.log(time)
// time.duration().subtract(1000)
// console.log(time)
// console.log(moment.duration((26 * 60000) - 1000).asMinutes())
// console.log(moment.duration((26 * 60000) - 2000).asMinutes())
```
