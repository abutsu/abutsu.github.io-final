var snake_game = function() {
    // canvas
    var canvas = document.getElementById("gameArea");
    var ctx = canvas.getContext("2d");
    // ctx.fillStyle = "red";



    var width = canvas.width;
    var height = canvas.height;



    // direction constants
    const UP = 0;
    const LEFT = 1;
    const DOWN = 2;
    const RIGHT = 3;

    // snake variables
    var snake_speed = 10;
    var speed_setter = document.getElementById("speed_setter");
    var speed_label = document.getElementById("speed_label");
    var snake_dir; // 0-UP, 1-LEFT, 2-DOWN, 3-RIGHT
    var snake_dir_next;
    var snake_color = 'red';
    var snake = [];
    var food;
    var food_coloring = ['pink', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'purple', 'white', 'brown', 'red'];
    var food_color = food_coloring[Math.floor(Math.random() * food_coloring.length)];

    var game_over = false;
    var flag_human = false;
    var flag_message = false;


    var score_element = document.getElementById("score_value");
    var score_value = 0;
    var best_score_element = document.getElementById("best_score_value");
    var best_score_value = 0;
    var nn = 0
    var new_game_button = document.getElementById("new_game");
    var nb_button = document.getElementById("nb");
    var wg_button = document.getElementById("whh");


    //var DIR_ENUMS = {0: "UP", 1: "LEFT", 2: "DOWN", 3: "RIGHT"};
    speed_setter.onchange = function() {
        snake_speed = parseInt(speed_setter.value);
        speed_label.innerHTML = String(speed_setter.value);
    }

    var mobile_up = document.getElementById("mobile_up");
    var mobile_left = document.getElementById("mobile_left");
    var mobile_down = document.getElementById("mobile_down");
    var mobile_right = document.getElementById("mobile_right");


    // event handlers for mobile phone controls
    document.addEventListener('keydown', function(e) {
        // 0-UP, 1-LEFT, 2-DOWN, 3-RIGHT
        if (e.which === 38) {
            snake_dir_next = UP;
        } else if (e.which === 37) {
            snake_dir_next = LEFT;
        } else if (e.which === 40) {
            snake_dir_next = DOWN;
        } else if (e.which === 39) {
            snake_dir_next = RIGHT;
        }
    });


    var set_score = function(val) {
        score_value = val;
        score_element.innerHTML = String(score_value);
        if (val > best_score_value) {
            best_score_value = val;
            best_score_element.innerHTML = String(best_score_value);
        }
    }

    // generate random food position and make sure it is not on the snake

    var generate_food = function() {
        food = { x: Math.floor(Math.random() * ((width) - 1) / 10), y: Math.floor(Math.random() * ((height) - 1) / 10) };
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == food.x && snake[i].y == food.y) {
                generate_food();
                break;
            }
        }
    }

    // initialize new game
    var init_snake = function() {
        snake = [];

        for (var i = 4; i >= 0; i--) {
            snake.push({ x: i + (width / 2) / 10 - 4, y: (height / 2) / 10 });
        }
        snake_dir = RIGHT;
        snake_dir_next = RIGHT;
        generate_food();
        set_score(0);
        //game_over = false;
    }

    var start_new_game = function() {
        init_snake();
        game_over = false;
        flag_message = false;
    }


    new_game_button.onclick = function() {
        start_new_game();
        flag_human = true;
        game_over = false;
        flag_message = false;
        document.getElementById("gameArea").style.borderWidth = "10px";
        nn = 2
    }

    nb_button.onclick = function() {
        start_new_game();
        flag_human = true;
        game_over = false;
        flag_message = false;
        document.getElementById("gameArea").style.borderWidth = "thick";
        nn = 1

    }

    wg_button.onclick = function() {
        var width2 = document.getElementById("wd").value;
        var height2 = document.getElementById("hg").value;
        document.getElementById("gameArea").width = width2;
        document.getElementById("gameArea").height = height2
        var generate_food = function() {
            food = { x: Math.floor(Math.random() * ((width2) - 1) / 10), y: Math.floor(Math.random() * ((height2) - 1) / 10) };
            for (var i = 0; i < snake.length; i++) {
                if (snake[i].x == food.x && snake[i].y == food.y) {
                    generate_food();
                    break;
                }
            }
        }
        var init_snake2 = function() {
            snake = [];

            for (var i = 4; i >= 0; i--) {
                snake.push({ x: i + (width2 / 2) / 10 - 4, y: (height2 / 2) / 10 });
            }
            snake_dir = RIGHT;
            snake_dir_next = RIGHT;
            generate_food();
            set_score(0);
            //game_over = false;
        }
        init_snake2();
        document.getElementById("gameArea").style.borderWidth = "thick";
        nn = 1
        var check_location2 = function(x, y) {
            // check walls
            if (nn != 1)
                if (x < 0 || x == width2 / 10 || y < 0 || y == height2 / 10)
                    return false;
                // check for self collision
            for (var i = 1; i < snake.length; i++) {
                if (x == snake[i].x && y == snake[i].y)
                    return false;
            }
            return true;
        }
        width = width2;
        height = height2;

    }




    var show_new_game_dialog = function() {

        $(document).ready(function() {
            $('#new_game_dialog').dialog({
                modal: true, //Not necessary but dims the page background
                open: function() {
                    $(this).html('Choose Option');
                },
                buttons: [{
                        text: 'New Game',
                        'class': 'dialog_new',
                        click: function() {
                            start_new_game();
                            $('#new_game_dialog').dialog('close');
                        }
                    },

                ]
            });
        });
    }

    init_snake();

    var check_location = function(x, y) {
        // check walls
        if (nn != 1)
            if (x < 0 || x == width / 10 || y < 0 || y == height / 10)
                return false;
            // check for self collision
        for (var i = 1; i < snake.length; i++) {
            if (x == snake[i].x && y == snake[i].y)
                return false;
        }
        return true;
    }


    // check if the snake eaten the food at his position
    var check_food = function(x, y) {
        return ((x == food.x)) && ((y == food.y));
    }


    // update the snake location by deleting the last tail block, and adding a new block in the next head location
    var update_location = function() {
        if (nn == 1 & snake[0].x < 0 || snake[0].x == width / 10 || snake[0].y < 0 || snake[0].y == height / 10) {
            var xNew1 = snake[0].x;
            var yNew1 = snake[0].y;
            switch (snake_dir) {
                case UP:
                    yNew1 = (height / 10) - 1;
                    break;
                case DOWN:
                    yNew1 = 0;
                    break;
                case LEFT:
                    xNew1 = (width / 10) - 1;
                    break;
                case RIGHT:
                    xNew1 = 0;
                    break;
            }
            snake.pop(); // remove the tail
            snake.unshift({ x: xNew1, y: yNew1 });
        } else {
            var xNew = snake[0].x;
            var yNew = snake[0].y;
            snake_dir = snake_dir_next;
            // Update the state of the world for the elapsed time since last render
            switch (snake_dir) {
                case UP:
                    yNew--;
                    break;
                case DOWN:
                    yNew++;
                    break;
                case LEFT:
                    xNew--;
                    break;
                case RIGHT:
                    xNew++;
                    break;
            }
            snake.pop(); // remove the tail
            snake.unshift({ x: xNew, y: yNew }); // add the head in the new location
        }
    }

    // check if the snake is still alive (not bumped into any walls or onto itself)

    var check_alive = function() {
        if (snake.length == 0)
            return;
        // check walls
        if (nn != 1)
            if (snake[0].x < 0 || snake[0].x == width / 10 || snake[0].y < 0 || snake[0].y == height / 10)
                return false;
            // check for self collision
        for (var i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
                return false;
        }
        return true;
    }


    var draw_block = function(x, y, col) {
        ctx.fillStyle = col;
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }

    var draw_snake = function() {
        for (var i = 0; i < snake.length; i++) {
            if (i == 0)
                snake_color = 'black';
            else {
                if (i % 3 != 0)
                    snake_color = 'red';
                else
                    snake_color = 'orange';
                //snake_color = food_coloring[Math.round(Math.random()*food_coloring.length)];

            }
            draw_block(snake[i].x, snake[i].y, snake_color);
        }
    }

    // main game loop
    var game_loop = function() {


        // call to function which update the next snake headings
        if (game_over == false)
            update_location();

        // check if the snake is still alive
        if (!check_alive() && game_over == false) {
            game_over = true;

        }

        if (snake.length == 0 && flag_message == false) {
            flag_message = true;
            show_new_game_dialog();

        }
        // check if the snake just ate the food
        if (game_over == false) {
            if (check_food(snake[0].x, snake[0].y) == true) {
                snake.push({ x: snake[0].x, y: snake[0].y }); // enlarge the snake (hihihihi)
                generate_food();
                food_color = food_coloring[Math.floor(Math.random() * food_coloring.length)]; // randomize food color
                draw_block(food.x, food.y, food_color); // draw food
                set_score(score_value + 1); // increase the score
            }
        }

        ctx.beginPath();
        ctx.clearRect(0, 0, width, height); // clear the canvas
        if (snake.length > 0)
            draw_snake();

        // call function to draw the snake food
        draw_block(food.x, food.y, food_color);

        // paint the head once more after dying
        if (game_over == true)
            if (snake.length > 0) {
                draw_block(snake[0].x, snake[0].y, 'black');
                snake.pop();
            }
            /*
             * little trick to allow combining the requestAnimationFrame and setTimeout
             * functions to create animation delays to control game speed
             */
        setTimeout(function() {
            window.requestAnimationFrame(game_loop);
            // Drawing code goes here
        }, 1000 / snake_speed);
    }

    // start the game loop

    window.requestAnimationFrame(game_loop);

    // change next direction parameter according to key pressed

    var change_dir = function(key) {
        if (((key == 87) || (key == 38)) && snake_dir != DOWN) {
            snake_dir_next = UP;
        }
        if (((key == 83) || (key == 40)) && snake_dir != UP) {
            snake_dir_next = DOWN;
        }
        if (((key == 65) || (key == 37)) && snake_dir != RIGHT) {
            snake_dir_next = LEFT;
        }
        if (((key == 68) || (key == 39)) && snake_dir != LEFT) {
            snake_dir_next = RIGHT;
        }
    }

    // on key pressed handler setup
    canvas.onkeydown = function(evt) {
        evt = evt || window.event;
        change_dir(evt.keyCode);
    }
    var keys = {};

    window.addEventListener("keydown",
        function(e) {
            keys[e.keyCode] = true;
            switch (e.keyCode) {
                case 37:
                case 39:
                case 38:
                case 40: // Arrow keys
                case 32:
                    e.preventDefault();
                    break; // Space
                default:
                    break; // do not block other keys
            }
        },
        false);
    window.addEventListener('keyup',
        function(e) {
            keys[e.keyCode] = false;
        },
        false);
}