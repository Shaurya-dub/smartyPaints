// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT5N3g6xqEllXNlfiv7ZQx3cCI4GrRqfk",
  authDomain: "smartypaints-ec02b.firebaseapp.com",
  projectId: "smartypaints-ec02b",
  storageBucket: "smartypaints-ec02b.appspot.com",
  messagingSenderId: "152932384333",
  appId: "1:152932384333:web:06d528c63950b0412c6604",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = firebase.database();
const db = getDatabase();
// async function initSnapshot() {
//   let dataArray = [];
//   await onValue(ref(db), (snapshot) => {
//     let data = { ...snapshot.val() };
//     console.log("snapshot", data);

//     for (let prop in data) {
//       dataArray.push;
//       console.log("Object", data[prop]);
//     }
//   });

//   console.log("after loop");
// }
$(function () {
  const $h2 = $("h2");
  let $buttons = $(".answer");
  const $hint = $(".hint");
  const $clue = $(".clue");
  const $playerName = $("#player");
  const $start = $(".start");
  const $intro = $(".intro");
  const $end = $(".end");
  const $highScoreList = $(".highScoreList");
  const $scoreName = $(".scoreName");
  const $scorePoints = $(".scorePoints");
  const $scoreTime = $(".scoreTime");
  const $pName = $(".tester");
  const $scDisplay = $(".target");
  const $reset = $(".reset");
  const $scMessage = $(".scMessage");

  let score = 0;
  let qCount = 0;
  let highScoreArray = [];
  let today;
  let endTime;
  const loadAnswers = () => {
    $clue.text(questionBank[qCount].hint);
    $h2.text(questionBank[qCount].question);
    let j = 0;
    for (let opt in questionBank[qCount].answers) {
      $buttons.eq(j).text(questionBank[qCount].answers[opt]);
      $buttons
        .eq(j)
        .css("background-image", questionBank[qCount].backgrounds[opt]);
      j++;
    }
  };

  // let today;
  // let endTime;
  // console.log("time", today.getTime());

  const questionBank = [
    {
      question: "This artist is the founder of Neoplasticism",
      answers: {
        wAnsOne: "Van Gogh",
        wAnsTwo: "Junji Ito",
        rAns: "Piet Mondrian",
        wAnsThree: "Claude Monet",
      },
      backgrounds: {
        wAnsOne:
          'url("media/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg")',
        wAnsTwo: 'url("media/Junji-Ito.jpg")',
        rAns: 'url("media/mondrian-100-year-legacy-1.jpeg")',
        wAnsThree: 'url("media/Les-Villas-a-Bordighera_720px.jpeg")',
      },
      hint: 'Their name is an anagram for "I paint modern"',
    },
    {
      question:
        "The period when Pablo Picasso painted mainly monochromatic paintings ",
      answers: {
        wAnsOne: "The Dull Years",
        rAns: "The Blue Period",
        wAnsTwo: "The Shaded Period",
        wAnsThree: "The Grey Period",
      },
      backgrounds: {
        wAnsOne: 'url("media/profileIcon_5moaaln7sky01.jpeg")',
        rAns: 'url("media/download.jpeg")',
        wAnsTwo: 'url("media/470px-PicassoGuernica.jpeg")',
        wAnsThree: 'url("media/greyPeriod.jpeg")',
      },
      hint: "Named after a color he used a lot",
    },
    {
      question: 'This dutch artist painted "The Night Café"',
      answers: {
        rAns: "Van Gogh",
        wAnsOne: "Francesco Clemente",
        wAnsTwo: "Gustav Klimt",
        wAnsThree: "Edvar Munch",
      },
      backgrounds: {
        rAns: 'url("media/starry-night-by-vincent-van-gogh-vincent-van-gogh.jpg")',
        wAnsOne: 'url("media/francescoClemente.jpeg")',
        wAnsTwo: 'url("media/gustavKlimt.jpeg")',
        wAnsThree: 'url("media/edvarMunch.jpeg")',
      },
      hint: "They're a little hard of hearing",
    },
    {
      question:
        "One of the most famous works by this artist is a painting of a soup can",
      answers: {
        rAns: "Andy Warhol",
        wAnsOne: "Frida Kahlo",
        wAnsTwo: "Kara Walker",
        wAnsThree: "Henri Matisse",
      },
      backgrounds: {
        rAns: 'url("media/andyWarhol.jpeg")',
        wAnsOne: 'url("media/fridaKahlo.jpeg")',
        wAnsTwo: 'url("media/karaWalker.jpeg")',
        wAnsThree: 'url("media/henriMatisse.jpeg")',
      },
      hint: "They were a good friend of Jean-Michel Basquiat",
    },
    {
      question:
        "This artist from 1980s NY is known for his vibrant, eye-catching pieces grounded in street culture",
      answers: {
        rAns: "Keith Haring",
        wAnsOne: "Basquiat",
        wAnsTwo: "Shepard Fairey",
        wAnsThree: "Willem de Kooning",
      },
      backgrounds: {
        rAns: 'url("media/keithHaring2.jpeg")',
        wAnsOne: 'url("media/basquiat.png")',
        wAnsTwo: 'url("media/shepardFairey.jpeg")',
        wAnsThree: 'url("media/wDeKooning.jpeg")',
      },
      hint: 'Initially did "subway drawings"',
    },
    {
      question:
        'Which Japanese artist is the founder of the "SuperFlat" movement?',
      answers: {
        wAnsOne: "Ogata Kōrin",
        wAnsTwo: "Yoshitomo Nara",
        rAns: "Takashi Murakami",
        wAnsThree: "Utawa Hiroshige",
      },
      backgrounds: {
        wAnsOne: 'url("media/ogataKorin.jpeg")',
        wAnsTwo: 'url("media/yoshimotoNara.jpeg")',
        rAns: 'url("media/takashiMurakami.jpeg")',
        wAnsThree: 'url("media/utawaHiroshige.jpeg")',
      },
      hint: 'Famous for the "smiling flower"',
    },
    {
      question:
        'This character created by American artist "KAWS" is considered a "subculture hero',
      answers: {
        wAnsOne: "Liquid Hal",
        rAns: "Companion",
        wAnsTwo: "Wimpus",
        wAnsThree: "Elenor",
      },
      backgrounds: {
        wAnsOne: 'url("media/kawsOne.jpeg")',
        rAns: 'url("media/kawsTwo.jpeg")',
        wAnsTwo: 'url("media/kawsThree.jpeg")',
        wAnsThree: 'url("media/kawsFour.jpeg")',
      },
      hint: "You probably want him around if you're lonely",
    },
    {
      question:
        'This insanely popular American designer founded the brand "Off-White"',
      answers: {
        rAns: "Virgil Abloh",
        wAnsOne: "Kanye West",
        wAnsTwo: "Rammelzee",
        wAnsThree: "Fahamu Pecou",
      },
      backgrounds: {
        rAns: 'url("media/virgilAbloh.png")',
        wAnsOne: 'url("media/kanyeWest.jpeg")',
        wAnsTwo: 'url("media/rammelzee.jpeg")',
        wAnsThree: 'url("media/fahamuPecou.jpeg")',
      },
      hint: "They founded 'Pyrex Vision'",
    },
    {
      question:
        'The proteges of this wildly influential tattoo artist include the likes of "Ed Hardy"',
      answers: {
        wAnsOne: "Kat Von D",
        wAnsTwo: "Mike Malone",
        wAnsThree: "Zeke Owen",
        rAns: "Sailor Jerry",
      },
      backgrounds: {
        wAnsOne: 'url("media/katVonD.jpeg")',
        wAnsTwo: 'url("media/mikeMalone.jpeg")',
        wAnsThree: 'url("media/zekeOwen.jpeg")',
        rAns: 'url("media/sailorJerry.jpeg")',
      },
      hint: "There is a rum named after him",
    },
    {
      question:
        "The real identity of this enigmatic graffiti artist is still not 100% confirmed",
      answers: {
        wAnsOne: "DONDI",
        rAns: "Banksy",
        wAnsTwo: "SEEN",
        wAnsThree: "Cope2",
      },
      backgrounds: {
        wAnsOne: 'url("media/dondi.jpeg")',
        rAns: 'url("media/banksy.jpeg")',
        wAnsTwo: 'url("media/seen.png")',
        wAnsThree: 'url("media/cope2.jpeg")',
      },
      hint: "They painted 'Balloon Girl' ",
    },
  ];

  async function initSnapshot() {
    // let dataArray = [];
    await onValue(ref(db), (snapshot) => {
      let data = { ...snapshot.val() };
      console.log("snapshot", data);
      highScoreArray = []
      // I Should probably refactor this to avoid double loop, even though technically it is O(1)
      for (let prop in data) {
        for (let score of data[prop]) {
          highScoreArray.push(score);
        }
        console.log("initialized array", highScoreArray);
      }
    });

    console.log("after loop");
  }

  initSnapshot();

  $start.on("click", function (e) {
    e.preventDefault();
    let start = new Date();
    today = start.getTime();
    console.log("time start", today);
    if (!$playerName.val()) {
      alert("Please Enter your name");
    } else {
      let pName = $playerName.val();

      $intro.css("display", "none");
      $clue.removeClass("show");
      // $clue.text(questionBank[qCount].hint);
      // $h2.text(questionBank[qCount].question);
      // let j = 0;
      // for (let opt in questionBank[qCount].answers) {
      //   $buttons.eq(j).text(questionBank[qCount].answers[opt]);
      //   $buttons
      //     .eq(j)
      //     .css("background-image", questionBank[qCount].backgrounds[opt]);
      //   j++;
      // }
      loadAnswers();
    }
  });

  for (let button of $buttons) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let rightAnswer = questionBank[qCount].answers["rAns"];
      if (button.innerText === rightAnswer) {
        score++;
      }
      if (qCount < questionBank.length - 1) {
        qCount++;
        $clue.removeClass("show");
        // $clue.text(questionBank[qCount].hint);
        // $h2.text(questionBank[qCount].question);

        // let j = 0;
        // for (let opt in questionBank[qCount].answers) {
        //   $buttons.eq(j).text(questionBank[qCount].answers[opt]);
        //   $buttons
        //     .eq(j)
        //     .css("background-image", questionBank[qCount].backgrounds[opt]);
        //   j++;
        // }
        loadAnswers();
      } else {
        let end = new Date();
        endTime = end.getTime();
        // console.log("End Time", (endTime - today) / 1000);
        // const timeTakenToFinish = (endTime - today) / 1000;
        const highScorePlayerName =  $playerName.val().slice(0,10);
        highScoreArray.push({
          score: score,
          time: (endTime - today) / 1000,
          name: highScorePlayerName
        });

        highScoreArray.sort((a,b) => {
          return (
            b.score - a.score || a.time - b.time
          )
        })

        console.log('sorted score', highScoreArray)

        // if (highScoreArray.length < 5) {
        //   highScoreArray.push({ score: score, time: (endTime - today) / 1000 });
        // } else {
        //   highScoreArray.map((obj) => {
        //     if (obj.score < score) {
        //       highScoreArray.push({
        //         score: score,
        //         time: (endTime - today) / 1000,
        //       });
        //     } else if (!obj.score > score && timeTakenToFinish < obj.time) {
        //       highScoreArray.push({
        //         score: score,
        //         time: (endTime - today) / 1000,
        //       });
        //     }
        //   });
        // }
        const arrayToSend = highScoreArray.slice(0,5)

        const db = getDatabase();
        const postListRef = ref(db);
        // const newPostRef = push(postListRef);
        set(postListRef, {
          arrayToSend
          // score: score,
          // time: (endTime - today) / 1000,
          //  objToSend
        });

        $end.css("display", "block");
        $pName.text($playerName.val());
        $playerName.val('');
        $scDisplay.text(score);
        // $highScoreList.empty();
        $scoreName.empty();
        $scorePoints.empty();
        $scoreTime.empty();
        for (let score of arrayToSend) {
          //  $highScoreList.append(`<div class="scoreHolder"> <p>${score.name}</p> <p>${score.score}</p> <p>${score.time}</p>  </div>`)
          $scoreName.append(`<p>${score.name}</p>`);
          $scorePoints.append(`<p>${score.score}</p>`);
          $scoreTime.append(`<p>${score.time}</p>`);

        }

        $scMessage.text(scoreMessage(score));
        $scMessage.css("color", "#a17ff5");
      }
    });
  }

  $hint.on("click", function (e) {
    e.preventDefault();
    $clue.toggleClass("show");
  });

  $reset.on("click", function () {
    // let end = new Date();
    // endTime = end.getTime();
    // console.log('End Time', (today - endTime) / 1000);
    qCount = 0;
    score = 0;
    $end.css("display", "none");
    $intro.css("display", "block");
    $clue.removeClass("show");
    // $clue.text(questionBank[qCount].hint);
    // $h2.text(questionBank[qCount].question);
    // let j = 0;
    // for (let opt in questionBank[qCount].answers) {
    //   $buttons.eq(j).text(questionBank[qCount].answers[opt]);
    //   $buttons
    //     .eq(j)
    //     .css("background-image", questionBank[qCount].backgrounds[opt]);
    //   j++;
    // }
    loadAnswers();
  });

  const scoreMessage = (value) => {
    if (value <= 2) {
      return "You philistine";
    } else if (value <= 5) {
      return "You aren't completely uncultured";
    } else if (value <= 8) {
      return "I'm quite impressed";
    } else {
      return "You're basically the Rembrandt of art facts";
    }
  };
});
