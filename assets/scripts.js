


//palya pontok kirajzolasa

//500px 10*10es kockak kellenek 1px borderrel


let route = 'w';

const board_size = 500;
let gameTime = '';//setInterval
let gameSpeed = 1000;
let gameScore = 0;
let snake_start_point = [10, 10]
let snake_body = [];
let snake_size = 1;

let apple_position = [];


const field_count = 20
const field_size = board_size / field_count; (25)
const boardElement = document.querySelector('.game-board');
boardElement.style.width = board_size + 'px';
boardElement.style.height = board_size + 'px';

for (x = 0; x < field_count; x++) {
    for (y = 0; y < field_count; y++) {
        const field = document.createElement('div');
        field.setAttribute('class', 'field' + x + '-' + y);
        field.dataset.matrix = [x, y];
        field.style.width = '23px'
        field.style.height = '23px'
        boardElement.appendChild(field)
    }
}


window.addEventListener('keypress', (event) => {
    route = event.key
})
document.querySelector('.start-game').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('aa')
    gameTime = setInterval(draw_snake, gameSpeed)
})




function draw_snake() {
    try {
        //alma kirajzolasa
        console.log('ALMA LENGTH' + apple_position.length)
        if (apple_position.length === 0) {
            drawApple()

        }
        switch (route) {
            case 'w': snake_start_point[0] -= 1;
                break;
            case 's': snake_start_point[0] += 1;
                break;
            case 'a': snake_start_point[1] -= 1;
                break;
            case 'd': snake_start_point[1] += 1;
                break;
        }
        snake_body.push([...snake_start_point]);

        console.log(snake_body + snake_start_point)

        if (!check_board(snake_start_point)) {
            showModal('Baj van vége', 'vége')
            clearInterval(gameTime)
        }



        //megrajzolom a kigyo előre lépését
        let startDiv = document.querySelector('.field' + snake_start_point[0] + '-' + snake_start_point[1])
        startDiv.style.backgroundColor = "#18FF6D"

        //majd ellenőrzőm
        if (snake_body.length > snake_size) {
            console.log(snake_body + 'ez a snake bodym')
            let last = snake_body.shift();
            let lastDiv = document.querySelector('.field' + last[0] + '-' + last[1])
            lastDiv.style.backgroundColor = "inherit"

            console.log(last + lastDiv + snake_body)
        }
    } catch (error) {
        console.log(error)
    }
}
function check_board(snake_start_point) {
    const xCoord = document.querySelector('.x-coord');
    const yCoord = document.querySelector('.y-coord');
    xCoord.innerHTML = snake_start_point[0];
    yCoord.innerHTML = snake_start_point[1];
    if (snake_start_point[0] < 0 || snake_start_point[0] > field_count || snake_start_point[1] < 0 || snake_start_point[1] > field_count) {
        return false;
    }
    if (snake_start_point[0] == apple_position[0] && snake_start_point[1] == apple_position[1]) {
        snake_size++;
        apple_position = [];
        gameSpeed -= 50;
        gameScore += 1;
        clearInterval(gameTime);
        gameTime = setInterval(draw_snake, gameSpeed)
        console.log('Alma', apple_position)
    }
    return true
}
function drawApple() {
    apple_position[0] = Math.floor(Math.random() * field_count);
    apple_position[1] = Math.floor(Math.random() * field_count);
    let appleDiv = document.querySelector('.field' + apple_position[0] + '-' + apple_position[1])
    appleDiv.style.backgroundColor = "red"
    console.log('alma', apple_position)
}









function showModal(msg, type) {
    console.log(msg, 'vége')
}

