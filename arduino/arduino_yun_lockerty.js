// CODERTY.
console.log('HI LOCKERTY!');

// CONSTANTS:
var ledPin 		 = 13;
var motorPin4 	 = 4;
var motorPin5    = 5;

var motorPin6    = 6;
var motorPin7    = 7;

var motorRuning  = false;
var intervalOpen = 3000;

//REQs
var firmata = require('firmata');
var io 		= require('socket.io-client');

var board = new firmata.Board("../../../../../dev/ttyATH0",function(err) {
if (err) 
{
    console.log('error:',err);
    board.reset();
	return;
} 
else 
{
    console.log('Arduino Connected!');
 
    // LEDS
    board.pinMode(ledPin, board.MODES.OUTPUT);

    //MOTOR
    board.pinMode(motorPin4, board.MODES.OUTPUT);
    board.pinMode(motorPin5, board.MODES.OUTPUT);
    board.pinMode(motorPin6, board.MODES.OUTPUT);
    board.pinMode(motorPin7, board.MODES.OUTPUT);

    board.digitalWrite(motorPin4, board.LOW);
    board.digitalWrite(motorPin5, board.LOW);
    board.digitalWrite(motorPin6, board.LOW);
    board.digitalWrite(motorPin7, board.LOW);

    //INICIALIZACION LEDS:
    board.digitalWrite(ledPin, board.LOW);

    // INIDICAODR 13 (FUNCIONANDO):
    board.digitalWrite(ledPin, board.HIGH);

    // START SOCKETCONTROL:
    socketControl();
}
});

function socketControl(){

	var socket = io('http://lockerty.eu-gb.mybluemix.net');
	//var socket = io('http://192.168.0.56:8080');

	  socket.on('connect', function () {
	    console.log('SocketIO Conected!');

	    socket.on('lockerOperations', function (msgOperation) {

	    	console.log('msgOperation:',msgOperation,' - msgOperation.operation:', msgOperation.operation);

	    	if (msgOperation.operation === 'open'){
	    		openDoor();
	    	}
	
	    	if (msgOperation.operation === 'close'){
	    		closeDoor();
	    	}
	
	    });

	});
};

function initializePins(callback){

	try {
		board.digitalWrite(ledPin, board.LOW);
	    board.digitalWrite(motorPin4, board.LOW);
        board.digitalWrite(motorPin5, board.LOW);
        board.digitalWrite(motorPin6, board.LOW);
        board.digitalWrite(motorPin7, board.LOW);

	}catch (err) {
   	 console.log(err)
	};
};


function beforeExit(err){

	if (err){ console.error(err);}
	
	initializePins(function(res, error){
		console.log('BYE!');
    	process.exit();
	});
};


function openDoor()
{
	console.log('OPENDOOR!');
    board.digitalWrite(motorPin6, board.LOW);
    board.digitalWrite(motorPin7, board.LOW);

	board.digitalWrite(motorPin4, board.HIGH);
    board.digitalWrite(motorPin5, board.HIGH);
	motorRuning = true;

    var stoper = setInterval(function() {
    if (motorRuning) {
      board.digitalWrite(motorPin4, board.LOW);
      board.digitalWrite(motorPin5, board.LOW);
      board.digitalWrite(motorPin6, board.LOW);
      board.digitalWrite(motorPin7, board.LOW);
      motorRuning = false;
    }
    clearInterval(stoper);
  }, intervalOpen);
};

function closeDoor()
{
    console.log('CLOSEDOOR!');
    board.digitalWrite(motorPin4, board.LOW);
    board.digitalWrite(motorPin5, board.LOW);

    board.digitalWrite(motorPin6, board.HIGH);
    board.digitalWrite(motorPin7, board.HIGH);
    motorRuning = true;

    var stoper = setInterval(function() {
    if (motorRuning) {
      board.digitalWrite(motorPin6, board.LOW);
      board.digitalWrite(motorPin7, board.LOW);
      board.digitalWrite(motorPin4, board.LOW);
      board.digitalWrite(motorPin5, board.LOW);
      motorRuning = false;
    }
    clearInterval(stoper);
  }, intervalOpen);
};

process.stdin.resume();

process.on('uncaughtException', function (err) {
	beforeExit(err);
});

process.on('exit', function (err) {
    beforeExit(err);
});

//catches ctrl+c event
process.on('SIGINT', function (err) {
    beforeExit(err);
});
