const container = document.querySelector('.appContainer');
const question = document.querySelector('h2');
const prevQuestion = document.querySelector('.prevQuestion');
const mute = document.querySelector('.fa-volume-mute');
const unmute = document.querySelector('.fa-volume-off');

const questionBank = [
    'What are your strengths?',
    'What are you passionate about?',
    'What are your weaknesses?',
    'Why are you interested in working for our company?',
    'Where do you see yourself in five years? Ten years?',
    'Why do you want to leave your current company?',
    'What can you offer us that someone else can not?',
    'What are three things your former manager would like you to improve on?',
    'Tell me about an accomplishment you are most proud of.',
    'Tell me about a time you made a mistake.',
    'What is your dream job?',
    'How did you hear about this position?',
    'What is your greatest accomplishment?',
    'What would you look to accomplish in the first 30 days / 60 days / 90 days on the job?',
    'Discuss your resume.',
    'Give me an example of a time you made a decision that was unpopular and explain how you handled implementing it.',
    'Discuss your educational background.',
    'Describe yourself.',
    'Tell me how you handled a difficult situation.',
    'Why should we hire you?',
    'Tell me about your past positions? What did you like? What didn’t you like?',
    'Why shouldn\'t we hire you?',
    'Why are you looking for a new job?',
    'How would you deal with an angry or irate customer?',
    'What are your salary requirements?', 
    'Give a time when you went above and beyond the requirements for a project.',
    'Who are our competitors?',
    'What was your biggest failure?',
    'What motivates you?',
    'What’s your availability?',
    'Who’s your mentor?',
    'Tell me about a time when you disagreed with your boss.',
    'How do you handle pressure?',
    'What are your career goals?',
    'What gets you up in the morning?',
    'What would your direct reports say about you?',
    'What were your bosses’ strengths / weaknesses?',
    'If I called your boss right now and asked him / her what is an area that you could improve on, what would he / she say?',
    'Are you a leader or a follower?',
    'How do you solve complex problems when you don\'t have much knowledge or expertise in the field ?',
    'What are you interested in doing and learning?',
    'What was the last book you’ve read for fun?',
    'What are your co-worker pet peeves?',
    'What are your hobbies?',
    'What is your favorite website?',
    'What makes you uncomfortable?',
    'What are some of your leadership experiences?',
    'What do you like the most and least about working in this industry?',
    'Would you work 40 + hours a week?',
    'What questions haven’t I asked you?',
    'What questions do you have for me?',
    'What makes you unique?'
];

// const colorBank = [
//     '#006466ff',
//     '#065a60ff',
//     '#0b525bff',
//     '#144552ff',
//     '#1b3a4bff',
//     '#212f45ff',
//     '#272640ff',
//     '#312244ff',
//     '#3e1f47ff',
//     '#4d194dff'
// ];

let newQ = '';
let firstQuestion = '';
let counter = 0;

const textToSpeech = (textToConvert) => {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = textToConvert;
    utter.volume = 0.5;
    window.speechSynthesis.speak(utter);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

window.addEventListener('load', () => {
    shuffleArray(questionBank);
    // shuffleArray(colorBank);
})

window.addEventListener('keydown', (e) => {
    switch (e.keyCode){
        case 32: 
            nextQuestion();
            break;
        case 39:
            nextQuestion();
            break;
        case 37: 
            previousQuestion();
            break;
    }
});

// const newColor = () => {
//     newBgColor = colorBank[counter]
//     container.style.backgroundColor = newBgColor;
// }

const previousQuestion = () => {
    speechSynthesis.cancel();
    counter--;
    if (counter > 1) {
        question.innerHTML = questionBank[counter - 1];
        if (unmute.className.includes('hidden')) {
            textToSpeech(questionBank[counter - 1])
        }
    } else {
        firstQuestion = 'Tell me about yourself.';
        question.innerHTML = firstQuestion;
        if (unmute.className.includes('hidden')) {
            textToSpeech(firstQuestion)
        }
        counter = 1;
    }
    // newColor();
}

const nextQuestion = () => {
    speechSynthesis.cancel();
    if (counter >= 1) {
        newQ = questionBank[counter]
        question.innerHTML = newQ;
        if (unmute.className.includes('hidden')) {
            textToSpeech(newQ)
        }
        counter++;
    } else {
        firstQuestion = 'Tell me about yourself.';
        question.innerHTML = firstQuestion;
        if (unmute.className.includes('hidden')) {
            textToSpeech(firstQuestion)
        }
        counter++;
    };
    // newColor();
}

prevQuestion.addEventListener('mouseup', () => {
   previousQuestion();
});

question.addEventListener('mouseup', () => {
   nextQuestion();
});


// MUTING FUNCTIONALITY
mute.addEventListener('mouseup', () => {
    speechSynthesis.cancel();
    unmute.classList.toggle('hidden')
    mute.classList.toggle('hidden')
});

unmute.addEventListener('mouseup', () => {
    mute.classList.toggle('hidden');
    unmute.classList.toggle('hidden');
    if (unmute.className.includes('hidden')) {
        textToSpeech(newQ)
    } else {
        textToSpeech(firstQuestion)
    }
});
// END OF MUTING FUNCTIONALITY